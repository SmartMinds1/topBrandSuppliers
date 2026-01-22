/*----- STEP ONE IN RBAC ------------*/
// Centralized roles & permission mapping
const ROLES = {
  ADMIN: "admin",
  STAFF: "staff",
  USER: "user",
};

/* Permissions are arbitrary strings used in checks like: requirePermission('users.delete')
   Map each role to the permissions it grants. */
const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    "users.read",
    "users.create",
    "users.update",
    "users.delete",
    "messages.delete",
    "messages.read",
    "messages.update",
    "orders.delete",
    "orders.read",
    "orders.update",
    "sessions.invalidate",
    "admin.panel",
  ],
  [ROLES.STAFF]: [
    "users.read",
    "orders.read",
    "orders.update",
    "messages.read",
    "messages.update",
  ],
  [ROLES.USER]: [
    "orders.create",
    "messages.create",
    "own_orders.read",
    "own_orders.update",
    "own_orders.cancel",
  ],
};

module.exports = { ROLES, ROLE_PERMISSIONS };
