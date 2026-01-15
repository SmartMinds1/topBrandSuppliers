//This file handles all the authentication logic
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // for resetting password
const { validationResult } = require("express-validator");
const logger = require("../utils/logger");
const jwtHelper = require("../utils/jwtHelper");
const { query } = require("../utils/pgHelper");
const { sendResetEmail } = require("../utils/emailHelper");

const MAX_SESSIONS = process.env.MAX_SESSIONS;

// User Registration <-----------------------------------------------
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  // Get data from request body
  let { username, email, password } = req.body;

  try {
    const saltRounds = process.env.NODE_ENV === "production" ? 12 : 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Determine who is creating the user
    // If an admin is logged in and adding users, use their email.
    // Otherwise, assume self-registration and set created_by = email.
    const createdBy = req.user?.email || email;
    const updatedBy = req.user?.email || email;

    // Add user to database with audit fields
    await query(
      `INSERT INTO topbrand_users 
        (username, email, password, created_by, updated_by, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
      [username, email, hashedPassword, createdBy, updatedBy]
    );

    logger.info(`User registered: ${username} (created_by: ${createdBy})`);
    res.status(201).json({ message: "Registration Successful!" });
  } catch (error) {
    if (error.code === "23505") {
      // PostgreSQL duplicate entry error
      logger.warn(`Registration failed: Duplicate entry for ${username}`);
      return res
        .status(409)
        .json({ message: "Username or email already exists!" });
    }

    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// User Login <--------------------<---------------------------
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const result = await query(
      "SELECT id, username, password, role, is_active FROM topbrand_users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      logger.warn(`Login failed: User not found (${username})`);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = result.rows[0];

    //check if user account is disabled
    if (!user.is_active)
      return res.status(403).json({ message: "Account disabled." });

    //if Enabled, validate credentials
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Incorrect password for (${username})`);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // -- LIMITING1 CONCURRENT SESSIONS ---
    const activeSessions = await query(
      `SELECT id, logged_in_at FROM topbrand_user_sessions 
       WHERE user_id = $1 AND is_active = true 
       ORDER BY logged_in_at ASC`, // oldest first
      [user.id]
    );

    if (activeSessions.rows.length >= MAX_SESSIONS) {
      const oldestSession = activeSessions.rows[0]; // oldest active one

      await query(
        `UPDATE topbrand_user_sessions 
         SET is_active = false 
         WHERE id = $1`,
        [oldestSession.id]
      );

      logger.info(
        `Oldest session disabled for user: ${username} to enforce limit of ${MAX_SESSIONS}`
      );
    }

    //get access token from jwtHelper
    const accessToken = jwtHelper.generateAccessToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    //get refresh token from jwtHelper
    const refreshToken = jwtHelper.generateRefreshToken({
      id: user.id,
      username: user.username,
      role: user.role,
    });

    // Hash the refresh token before saving
    const saltRounds = 12;
    const refreshTokenHash = await bcrypt.hash(refreshToken, saltRounds);

    // TRACK this session
    // Capture device + IP info
    const ipAddress = req.ip;
    const deviceInfo = req.headers["user-agent"] || "Unknown device";

    // Store new session in DB
    await query(
      `INSERT INTO topbrand_user_sessions 
      (user_id, refresh_token_hash, ip_address, device_info, is_active, logged_in_at, last_activity_at)
      VALUES ($1, $2, $3, $4, true, NOW(), NOW())`,
      [user.id, refreshTokenHash, ipAddress, deviceInfo]
    );

    console.log("Creating a new session for:", username);

    //using a cookie to store refreshToken
    console.log("Setting cookie for:", username);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken, role: user.role, username: user.username });
    logger.info(`Login successful: ${username}`);
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

//AUTO login if already have an accessToken <------------------------------------------
exports.accessTokenLogin = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const accessToken = authHeader.split(" ")[1];
    const decoded = jwtHelper.verifyAccessToken(accessToken);

    return res.json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

//Login with EXISTING Refresh Token <------------------------<----------------------
exports.refreshToken = async (req, res) => {
  // Get refresh token from cookies
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    // Verify refresh token
    const payload = jwtHelper.verifyToken(refreshToken);
    if (!payload) {
      logger.warn("Invalid refresh token.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // Capture current device and IP information from this refresh request
    const currentIp = req.ip;
    const currentDevice = req.headers["user-agent"] || "Unknown device";

    // Fetch all active sessions for this user
    const result = await query(
      `SELECT id, refresh_token_hash, ip_address, device_info
    FROM topbrand_user_sessions
    WHERE user_id = $1 AND is_active = true`,
      [payload.id]
    );

    let validSession = null;
    for (const session of result.rows) {
      const match = await bcrypt.compare(
        refreshToken,
        session.refresh_token_hash
      );
      if (match) {
        validSession = session;
        break;
      }
    }

    if (!validSession) {
      logger.warn("Refresh token mismatch or tampered.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // ---STRICT MODE SECURITY CHECK---
    // Ensure refresh request comes from same IP and device as the login session
    const ipMismatch =
      validSession.ip_address && validSession.ip_address !== currentIp;
    const deviceMismatch =
      validSession.device_info && validSession.device_info !== currentDevice;

    if (ipMismatch || deviceMismatch) {
      // Mark session as suspicious and deactivate immediately
      await query(
        `UPDATE topbrand_user_sessions
         SET is_active = false, logged_out_at = NOW()
         WHERE id = $1`,
        [validSession.id]
      );

      logger.warn(
        `Suspicious refresh detected for user: ${payload.username}. 
         IP/Device mismatch — Session deactivated.`
      );

      // Block the request and notify client
      return res.status(403).json({
        message:
          "Suspicious activity detected. Session terminated for security reasons.",
      });
    }

    //OTHERWISE, UPDATE last activity session
    await query(
      `UPDATE topbrand_user_sessions
       SET last_activity_at = NOW()
       WHERE id = $1`,
      [validSession.id]
    );

    // Token is valid — proceed to issue new access token
    const newAccessToken = jwtHelper.generateAccessToken({
      id: payload.id,
      username: payload.username,
      role: payload.role,
    });

    // Re-set cookie expiry (to keep session alive)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    logger.info(`New access token issued for user: ${payload.username}`);
    res.json({
      accessToken: newAccessToken,
      role: payload.role,
      username: payload.username,
    });
  } catch (error) {
    logger.error(`Refresh token error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Logout <-----------------------------------------------
exports.logout = async (req, res) => {
  try {
    // Extract access token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access token missing or invalid." });
    }
    const accessToken = authHeader.split(" ")[1];

    // Get refresh token from cookies
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing." });
    }

    // Verify access token
    const decoded = jwtHelper.verifyAccessToken(accessToken);
    if (!decoded) {
      logger.warn("Invalid access token during logout.");
      return res.status(403).json({ message: "Invalid access token." });
    }

    // Blacklist the access token in Redis
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    await jwtHelper.blacklistToken(accessToken, expiresIn);

    // Verify and blacklist refresh token
    const payload2 = jwtHelper.verifyToken(refreshToken);
    if (!payload2) {
      logger.warn("Invalid refresh token during logout.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    const refreshExpiresIn = payload2.exp - Math.floor(Date.now() / 1000);
    await jwtHelper.blacklistToken(refreshToken, refreshExpiresIn);

    // Fetch all sessions for this user
    const sessions = await query(
      `SELECT id, refresh_token_hash FROM topbrand_user_sessions WHERE user_id = $1 AND is_active = true`,
      [payload2.id]
    );

    // Compare to find the matching session
    let matchedSessionId = null;
    for (const session of sessions.rows) {
      const match = await bcrypt.compare(
        refreshToken,
        session.refresh_token_hash
      );
      if (match) {
        matchedSessionId = session.id;
        break;
      }
    }

    if (!matchedSessionId) {
      logger.warn("Logout failed: Refresh token not found in DB.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // Deactivate the correct session and update logout time
    await query(
      `UPDATE topbrand_user_sessions
       SET is_active = false,
           logged_out_at = NOW()
       WHERE id = $1`,
      [matchedSessionId]
    );

    logger.info("Session DEACTIVATED successfully!");

    // Clear cookie securely
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    // Send success response
    logger.info(`User logged out: ${decoded.username}`);
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// FORGOT PASSWORD <----------------------------------------------------------
exports.forgotPassword = async (req, res) => {
  const email = req.body?.email;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "A valid email is required." });
  }

  try {
    const cleanEmail = email.trim().toLowerCase();

    // 1️⃣ Check if user exists
    const userResult = await query(
      "SELECT id FROM topbrand_users WHERE email = $1",
      [cleanEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Email not found." });
    }

    // 2️⃣ Generate secure token & expiry
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    // 3️⃣ Save token & expiry in DB
    await query(
      "UPDATE topbrand_users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3",
      [token, expires, cleanEmail]
    );

    // 4️⃣ Send reset email via helper
    await sendResetEmail(cleanEmail, token);

    logger.info(`✅ Password reset token sent to ${cleanEmail}`);
    res.json({ message: "Password reset link sent to email." });
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error." });
  }
};

// RESET PASSWORD <----------------------------------------------------------
exports.resetPassword = async (req, res) => {
  const token = req.params?.token;
  const newPassword = req.body?.newPassword;

  // Validate inputs
  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Invalid or missing token." });
  }

  if (
    !newPassword ||
    typeof newPassword !== "string" ||
    newPassword.length < 6
  ) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters long." });
  }

  try {
    // Fetch user with matching token
    const result = await query(
      "SELECT id, reset_token_expires FROM topbrand_users WHERE reset_token = $1",
      [token]
    );

    // Validate token exists & not expired
    if (
      result.rows.length === 0 ||
      new Date(result.rows[0].reset_token_expires) < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const userId = result.rows[0].id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password & clear token fields
    await query(
      `UPDATE topbrand_users
       SET password = $1, reset_token = NULL, reset_token_expires = NULL
       WHERE id = $2`,
      [hashedPassword, userId]
    );

    logger.info(` Password reset successful for user ID ${userId}`);
    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error." });
  }
};
