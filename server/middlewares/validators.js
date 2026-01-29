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

/* ----------------------PRODUCT ORDER SECTION----------------------------- */
exports.product_nameValidation = body("productName")
  .notEmpty()
  .withMessage("Kindly enter your product name")
  .trim()
  .escape()
  .replace(/[ \t]{3,}/g, "  ")
  .toLowerCase();

exports.product_packageValidation = body("packageType")
  .notEmpty()
  .withMessage("Kindly Select your product package")
  .trim()
  .escape()
  .replace(/[ \t]{3,}/g, "  ")
  .toLowerCase();

exports.product_sizeValidation = body("sizeKg")
  .notEmpty()
  .withMessage("Product size must not be empty")
  .isNumeric()
  .withMessage("Product size must be numeric")
  .trim()
  .escape();

exports.product_qtyValidation = body("qty")
  .notEmpty()
  .withMessage("Product quantity must not be empty")
  .isNumeric()
  .withMessage("Product quantity must be a number")
  .trim()
  .escape();

exports.product_priceValidation = body("productPrice")
  .notEmpty()
  .withMessage("Product quantity must not be empty")
  .isNumeric()
  .withMessage("Product quantity must be a number")
  .trim()
  .escape();

/* -------------------- Validators for Bulk Quotation--------------------------- */
exports.companyNameValidation = body("companyName")
  .notEmpty()
  .withMessage("Company name is required")
  .trim()
  .escape()
  .replace(/[ \t]{3,}/g, "  ");

exports.contactPersonValidation = body("contactPerson")
  .notEmpty()
  .withMessage("Contact person is required")
  .trim()
  .escape()
  .replace(/[ \t]{3,}/g, "  ");

exports.countryValidation = body("country")
  .notEmpty()
  .withMessage("Country is required")
  .trim()
  .escape()
  .replace(/[ \t]{3,}/g, "  ")
  .toLowerCase();

exports.businessTypeValidation = body("businessType")
  .notEmpty()
  .withMessage("Business type is required")
  .trim()
  .escape()
  .isIn([
    "retailer",
    "wholesaler",
    "distributor",
    "manufacturer",
    "restaurant",
    "other",
  ])
  .withMessage("Invalid business type");

exports.productsValidation = body("products")
  .isArray({ min: 1 })
  .withMessage("At least one product must be selected");

exports.quantitiesValuesValidation = body("quantities").custom(
  (quantities, { req }) => {
    const products = req.body.products || [];

    for (const product of products) {
      const value = quantities?.[product];

      if (value === "" || value === null || value === undefined) {
        throw new Error(`Quantity required for ${product}`);
      }

      if (isNaN(value)) {
        throw new Error(`Quantity for ${product} must be numeric`);
      }
    }

    return true;
  }
);

exports.deliveryRequirementsValidation = body("deliveryRequirements")
  .optional({ nullable: true })
  .trim()
  .escape()
  .replace(/[ \t]{3,}/g, "  ");

exports.additionalInfoValidation = body("additionalInfo")
  .optional({ nullable: true })
  .trim()
  .escape()
  .replace(/[ \t]{3,}/g, "  ");
