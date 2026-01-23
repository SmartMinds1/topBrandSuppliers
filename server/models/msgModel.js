//This is the endpoint file for all of our requests. The queries submits requests to the server and gets back the feedback
const { query } = require("../utils/pgHelper");

// Insert into the database
async function createMessage(username, email, phone, message) {
  return query(
    "INSERT INTO topbrand_messages (username, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING *",
    [username, email, phone, message]
  );
}

// Select All from the database
const getAllMessages = async () => {
  const result = await query(
    "SELECT id, username, email, phone, message, created_at FROM topbrand_messages ORDER BY created_at DESC"
  );
  return result;
};

// Delete from the database
const deleteMessage = async (messageId) => {
  const result = await query(
    "DELETE FROM topbrand_messages WHERE id = $1 RETURNING * ",
    [messageId]
  );
  return result;
};

module.exports = { createMessage, getAllMessages, deleteMessage };
