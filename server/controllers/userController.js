const { query } = require("../utils/pgHelper");
const logger = require("../utils/logger");
const UserService = require("../services/userService");

/* -------------The next route is for fetching users from the database------------------------- */
// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(200).json(data);
  } catch (err) {
    logger.error(`Error fetching users: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

//Promoting User to Admin
exports.makeAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure the target user exists
    const userCheck = await query(
      "SELECT * FROM topbrand_users WHERE id = $1",
      [id]
    );
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update user role to admin
    const result = await query(
      `UPDATE topbrand_users 
       SET role = 'admin', updated_at = NOW(), updated_by = $1
       WHERE id = $2 RETURNING id, username, role`,
      [req.user.username, id]
    );

    logger.info(`User ID ${id} promoted to admin by ${req.user.username}`);
    return res.status(200).json({
      message: "User promoted to admin successfully.",
      user: result.rows[0],
    });
  } catch (error) {
    logger.error(`Error promoting user to admin: ${error.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// DELETE a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const result = await UserService.deleteUser(req.params.id);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    logger.info("User deleted successfully");
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    logger.error(`Error deleting User: ${err.message}`);
    res.status(500).json({ error: "Error deleting user. Try again later." });
  }
};
