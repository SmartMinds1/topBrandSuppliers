//This is the endpoint file for all of our requests. The queries submits requests to the server and gets back the feedback
const { query } = require("../utils/pgHelper");

// Insert into the database
async function createMessage(username, email, message) {
  return query(
    "INSERT INTO smartygrand_messages (username, email, message) VALUES ($1, $2, $3) RETURNING *",
    [username, email, message]
  );
}

// Select All from the database
const getAllMessages = async () => {
  const result = await query(
    "SELECT id, username, email, message, created_at FROM smartygrand_messages ORDER BY id DESC"
  );
  return result;
};

// Delete from the database
const deleteMessage = async (messageId) => {
  const result = await query(
    "DELETE FROM smartygrand_messages WHERE id = $1 RETURNING * ",
    [messageId]
  );
  return result;
};

module.exports = { createMessage, getAllMessages, deleteMessage };
