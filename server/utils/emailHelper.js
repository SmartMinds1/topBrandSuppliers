const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

//validating if the credentials exist
[
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REDIRECT_URI",
  "GOOGLE_REFRESH_TOKEN",
  "GMAIL_SENDER_EMAIL",
  "CLIENT_URL",
].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
});

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const EMAIL_USER = process.env.GMAIL_SENDER_EMAIL;

// Initialize OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// Get access token from OAuth2 client
const getAccessToken = async () => {
  try {
    const accessTokenResponse = await oAuth2Client.getAccessToken();
    if (!accessTokenResponse?.token) {
      throw new Error("No access token received.");
    }
    return accessTokenResponse.token;
  } catch (err) {
    console.error("❌ OAuth Access Token Error:", err.message);
    throw err;
  }
};

// Send password reset email
const sendResetEmail = async (to, token) => {
  try {
    const accessToken = await getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true, //new
      auth: {
        type: "OAuth2",
        user: EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const mailOptions = {
      from: `"SmartyGrand Support" <${EMAIL_USER}>`,
      to,
      replyTo: EMAIL_USER, // ✔ improves trust
      subject: "Password Reset Request",
      text: `You requested to reset your password.\n\nClick the link below to set a new password:\n${resetLink}\n\nThis link will expire in 1 hour.\nIf you didn't request this, please ignore the email.`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset</h2>
          <p>You requested to reset your password. Click the link below to set a new password:</p>
          <a href="${resetLink}" style="background: #007bff; padding: 10px 20px; color: white; text-decoration: none;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p style="font-size: 12px; color: #777;">
          This email was sent by SmartyGrand. If you did not request this action, you can safely ignore this message.
          </p>          
        </div>
      `,
      headers: {
        "X-Priority": "1 (Highest)",
        "X-Mailer": "Nodemailer",
      },
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Error sending reset email:", error);
    throw new Error("Unable to send reset email.");
  }
};

module.exports = {
  sendResetEmail,
};
