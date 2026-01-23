//This file handles all the messages LOGIC
const logger = require("../utils/logger");
const { validationResult } = require("express-validator");
const MsgService = require("../services/msgService");

// Add a new message
exports.sendMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Get data from body
  const { username, email, phone, message } = req.body;

  try {
    // Insert into the database
    const data = await MsgService.sendMessage(username, email, phone, message);

    logger.info(`Message sent by: ${username}`);
    res.status(201).json({
      message: "SUCCESSFULL! Will get back to you soon...",
      data,
    });
  } catch (err) {
    logger.error(`Error inserting message: ${err.message}`);
    res
      .status(500)
      .json({ error: "Internal Server Error. Kindly try again later!" });
  }
};

// GET all messages
exports.getAllMessages = async (req, res) => {
  try {
    const data = await MsgService.getAllMessages();
    res.status(200).json(data);
  } catch (err) {
    logger.error(`Error fetching messages: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// DELETE a message by ID
exports.deleteMessage = async (req, res) => {
  try {
    const result = await MsgService.deleteMessage(req.params.id);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    logger.info("Message deleted successfully");
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    logger.error(`Error deleting message: ${err.message}`);
    res.status(500).json({ error: "Error deleting Message. Try again later." });
  }
};
