//This file is typically used to validate user input before it reaches your main route logic.

const { body } = require("express-validator");

exports.usernameValidation = body("username")
  .notEmpty()
  .withMessage("Username is required.")
  .trim()
  .escape()
  .replace(/[ \t]{3,}/g, "  ")
  .toLowerCase()
  .isLength({ min: 3, max: 20 })
  .withMessage("Username must be at least 3 - 20 characters long.");

exports.emailValidation = body("email")
  .notEmpty()
  .withMessage("Email is required.")
  .trim()
  .escape()
  .isEmail()
  .withMessage("Invalid email address.")
  .replace(/[ \t]{3,}/g, "  ")
  .toLowerCase();

exports.passwordValidation = body("password")
  .notEmpty()
  .withMessage("Password is required.")
  .trim()
  .escape()
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long.")
  .replace(/[ \t]{3,}/g, "  ");

exports.messageValidation = body("message")
  .notEmpty()
  .withMessage("Message should not be empty")
  .trim()
  .escape()
  .replace(/[ \t]{3,}/g, "  ");

exports.commentValidation = body("comment")
  .notEmpty()
  .withMessage("Comment must not be null")
  .trim();

exports.accessTokenValidation = body("accessToken")
  .notEmpty()
  .withMessage("Access token is required.")
  .isString()
  .withMessage("Access token must be a string.");

exports.phoneValidation = body("phone")
  .notEmpty()
  .withMessage("Phone must not be empty")
  .isNumeric()
  .trim()
  .escape()
  .isLength({ max: 15 })
  .withMessage("Enter a valid phone length");

exports.payment_codeValidation = body("payment_code")
  .notEmpty()
  .withMessage("payment_code must not be empty")
  .trim()
  .escape()
  .isLength({ max: 10 })
  .withMessage("Enter a valid Code length");

exports.checkinValidation = body("checkin")
  .notEmpty()
  .isISO8601()
  .withMessage("Checkin must be a valid date");

exports.checkoutValidation = body("checkout")
  .notEmpty()
  .isISO8601()
  .withMessage("Checkout must be a valid date");

exports.questValidation = body("guests")
  .notEmpty()
  .isInt({ min: 1 })
  .withMessage("Guests must be a number greater than 0");

exports.roomValidation = body("room")
  .notEmpty()
  .withMessage("Room must not be empty")
  .trim()
  .escape();
