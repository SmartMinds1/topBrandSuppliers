//This is the endpoint file for all of our requests. The queries submits requests to the server and gets back the feedback
const { query } = require("../utils/pgHelper");

// Select All from the database
const getAllUsers = async () => {
  const result = await query(
    "SELECT id, username, email FROM topbrand_users ORDER BY id DESC"
  );
  return result;
};

// Delete from the database
const deleteUser = async (userId) => {
  const result = await query(
    "DELETE FROM topbrand_users WHERE id = $1 RETURNING *",
    [userId]
  );
  return result;
};

module.exports = { getAllUsers, deleteUser };
