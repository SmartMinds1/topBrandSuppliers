/* STEP 2: LETS CREATE CHECK POINTS FOR ROLES AND PERMISSIONS */
const { ROLE_PERMISSIONS, ROLES } = require("../utils/roles");
const logger = require("../utils/logger");
/*
 Usage: app.get('/admin', requireRole('admin'), handler)
*/

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    // Getting role from the req.user that we set earlier after verifying the token
    const userRole = req.user && req.user.role;
    if (!userRole) {
      logger.error("Unauthorized: missing or invalid user role");
      return res.status(401).json({ message: "Unauthorized." });
    }

    //Give permission to proceed if the role exists
    if (allowedRoles.includes(userRole)) return next();

    if (!allowedRoles.includes(userRole)) {
      logger.error(`Forbidden: role '${userRole}' not allowed`);
      return res.status(403).json({ message: "Forbidden: insufficient role." });
    }
  };
}

/*
 User now has the rolw but are they allowed to perform the task?
 Checks whether the user's role maps to a permission in ROLE_PERMISSIONS
 Usage: app.delete('/users/:id', requirePermission('users.delete'), handler)
*/

function requirePermission(permission) {
  return (req, res, next) => {
    //getting role from req.user
    const userRole = req.user && req.user.role;
    if (!userRole) {
      logger.error("Unauthorized: no user role found.");
      return res.status(401).json({ message: "Unauthorized." });
    }

    //if role exists, check permission
    const allowed = ROLE_PERMISSIONS[userRole] || [];
    if (allowed.includes(permission)) return next();

    if (!allowed.includes(permission)) {
      logger.error(
        `Forbidden: '${userRole}' lacks '${permission}' permission.`
      );
      return res
        .status(403)
        .json({ message: "Forbidden: missing permission." });
    }
  };
}

module.exports = { requireRole, requirePermission };
