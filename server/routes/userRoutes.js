//Before sending anything to the controller, the route verifies everything and determines who in the controller should execute that request
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//Authorization
const { requireRole, requirePermission } = require("../middlewares/checkRoles");
const { ROLES } = require("../utils/roles");
const checkAccessBlacklist = require("../middlewares/checkAccessBlacklist");

// getting all users
router.get(
  "/",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN, ROLES.STAFF),
  requirePermission("users.read"),
  userController.getAllUsers
);

//Promote User to Admin
router.patch(
  "/make-admin/:id",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN),
  requirePermission("users.update"),
  userController.makeAdmin
);

// DELETE a message by id
router.delete(
  "/:id",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN),
  requirePermission("users.delete"),
  userController.deleteUser
);

module.exports = router;
