// This file will check if the refresh token is blacklisted
const jwtHelper = require("../utils/jwtHelper");

const checkRefreshBlacklist = async (req, res, next) => {
  // ✅ Get refresh token from cookies instead of body
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required." });
  }

  const isBlacklisted = await jwtHelper.isTokenBlacklisted(refreshToken);

  if (isBlacklisted) {
    return res
      .status(403)
      .json({ message: "Refresh token has been blacklisted." });
  }

  next();
};

module.exports = checkRefreshBlacklist;
