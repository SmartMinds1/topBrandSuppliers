// Rate limiter to protect against brute force or flooding
const rateLimit = require("express-rate-limit");

const noop = (req, res, next) => next(); // does nothing (used in dev mode)
const isProduction = process.env.NODE_ENV === "production";

// Preventing bots or users from spamming our registration
const registerLimiter = isProduction
  ? rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 3,
      handler: (req, res) => {
        res.status(429).json({
          status: 429,
          error: "Too many registration attempts.",
          message: "Too many attempts! Wait and Try again later.",
        });
      },
      standardHeaders: true,
      legacyHeaders: false,
    })
  : noop;

//Lets Protect against brute-force password guessing
const loginLimiter = isProduction
  ? rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 5,
      handler: (req, res) => {
        res.status(429).json({
          status: 429,
          error: "Too many login attempts",
          message: "Please wait 15 minutes before trying again.",
        });
      },
      standardHeaders: true,
      legacyHeaders: false,
    })
  : noop;

//Lets Prevent spamming to our contact form
const contactLimiter = isProduction
  ? rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 10,
      handler: (req, res) => {
        res.status(429).json({
          status: 429,
          error: "Too many contact form submissions.",
          message: "Wait and Try again later.",
        });
      },
      standardHeaders: true,
      legacyHeaders: false,
    })
  : noop;

//Lets Prevent spamming to our comments form
const commentLimiter = isProduction
  ? rateLimit({
      windowMs: 60 * 60 * 1000,
      max: 1,
      handler: (req, res) => {
        res.status(429).json({
          status: 429,
          error: "You can only have one comment per session",
          message: "Wait and Try again later.",
        });
      },
      standardHeaders: true,
      legacyHeaders: false,
    })
  : noop;

module.exports = {
  registerLimiter,
  loginLimiter,
  contactLimiter,
  commentLimiter,
};
