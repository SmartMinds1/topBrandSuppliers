//Before sending anything to the controller, the route verifies everything and determines who in the controller should execute that request
const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

//Authorization
const { requireRole, requirePermission } = require("../middlewares/checkRoles");
const { ROLES } = require("../utils/roles");
const checkAccessBlacklist = require("../middlewares/checkAccessBlacklist");

// USER : CREATE NEW ORDER
router.post("/", checkAccessBlacklist, orderController.createOrder);

// ADMIN : GET ALL ORDERS
router.get(
  "/",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN, ROLES.STAFF),
  requirePermission("orders.read"),
  orderController.getAllOrders
);

// ADMIN : UPDATE ORDER BY ID
router.put(
  "/status/:id",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN, ROLES.STAFF),
  requirePermission("orders.update"),
  orderController.updateOrderStatusById
);

// ADMIN : DELETE ORDER BY ID
router.delete(
  "/:id",
  checkAccessBlacklist,
  requireRole(ROLES.ADMIN),
  requirePermission("orders.delete"),
  orderController.deleteOrderById
);

//USER : GET OWN ORDERS
router.get(
  "/my-orders",
  checkAccessBlacklist,
  requireRole(ROLES.USER),
  requirePermission("own_orders.read"),
  orderController.getMyOrders
);

//USER : UPDATE OWN ORDER BY ID
router.put(
  "/my-orders/:id",
  checkAccessBlacklist,
  requireRole(ROLES.USER),
  requirePermission("own_orders.update"),
  orderController.updateMyOrder
);

//USER : CANCEL OWN ORDER BY ID
router.patch(
  "/my-orders/:id/cancel",
  checkAccessBlacklist,
  requireRole(ROLES.USER),
  requirePermission("own_orders.cancel"),
  orderController.cancelMyOrder
);

module.exports = router;
