//Before sending anything to the controller, the route verifies everything and determines who in the controller should execute that request
const express = require("express");
const msgController = require("../controllers/msgController");
const router = express.Router();
const { contactLimiter } = require("../middlewares/limiter");
const {
  usernameValidation,
  emailValidation,
  messageValidation,
} = require("../middlewares/validators");

//Authorization
const { requireRole, requirePermission } = require("../middlewares/checkRoles");
const { ROLES } = require("../utils/roles");
const checkAccessBlacklist = require("../middlewares/checkAccessBlacklist");

// Add a new message
router.post(
  "/",
  contactLimiter,
  [usernameValidation, emailValidation, messageValidation],
  msgController.sendMessage
);

// getting all messages
router.get(
  "/",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN, ROLES.STAFF),
  requirePermission("messages.read"),
  msgController.getAllMessages
);

// DELETE a message by id
router.delete(
  "/:id",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN),
  requirePermission("messages.delete"),
  msgController.deleteMessage
);

module.exports = router;
