//Before sending anything to the controller, the route verifies everything and determines who in the controller should execute that request
const express = require("express");
const bulkController = require("../controllers/bulkController");
const router = express.Router();
const {
  companyNameValidation,
  contactPersonValidation,
  emailValidation,
  phoneValidation,
  countryValidation,
  businessTypeValidation,
  productsValidation,
  quantitiesValuesValidation,
  deliveryRequirementsValidation,
  additionalInfoValidation,
} = require("../middlewares/validators");

//Authorization
const { requireRole, requirePermission } = require("../middlewares/checkRoles");
const { ROLES } = require("../utils/roles");
const checkAccessBlacklist = require("../middlewares/checkAccessBlacklist");

// Add a new Bulk Quote
router.post(
  "/",
  [
    companyNameValidation,
    contactPersonValidation,
    emailValidation,
    phoneValidation,
    countryValidation,
    businessTypeValidation,
    productsValidation,
    quantitiesValuesValidation,
    deliveryRequirementsValidation,
    additionalInfoValidation,
  ],
  bulkController.createBulkQuote
);

// getting all Bulk Quotations
router.get(
  "/",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN, ROLES.STAFF),
  requirePermission("bulks.read"),
  bulkController.getAllBulkQuotes
);

// DELETE a given Quotation by ID
router.delete(
  "/:id",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN),
  requirePermission("bulks.delete"),
  bulkController.deleteBulkQuoteById
);

module.exports = router;
