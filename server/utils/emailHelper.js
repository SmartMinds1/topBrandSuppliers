// utils/emailHelper.js
const MailerSend = require("@mailersend/mailersend").default;
require("dotenv").config();

// Validate required environment variables
["MAILERSEND_API_KEY", "MAILER_FROM_EMAIL", "CLIENT_URL"].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
});

const client = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const EMAIL_FROM = process.env.MAILER_FROM_EMAIL;

// Send password reset email
const sendResetEmail = async (to, token) => {
  try {
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const params = {
      from: EMAIL_FROM,
      to: [to],
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Password Reset</h2>
          <p>You requested to reset your password. Click the button below to set a new password:</p>
          <a href="${resetLink}" style="background: #007bff; padding: 10px 20px; color: white; text-decoration: none;">Reset Password</a>
          <p>This link will expire in 1 hour.</p>
          <p style="font-size: 12px; color: #777;">
          If you did not request this, you can safely ignore this message.
          </p>          
        </div>
      `,
    };

    await client.email.send(params);

    console.log(`✅ Reset email sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending reset email:", err);
    throw new Error("Unable to send reset email");
  }
};

module.exports = {
  sendResetEmail,
};
