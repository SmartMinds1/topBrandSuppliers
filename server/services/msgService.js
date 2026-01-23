//This file handles all the required business logic for all message routes
const msgModel = require("../models/msgModel");

class MsgService {
  // Add a new message
  static async sendMessage(username, email, phone, message) {
    const result = await msgModel.createMessage(
      username,
      email,
      phone,
      message
    );
    return result.rows[0]; // return data only
  }

  // Get all messages
  static async getAllMessages() {
    const result = await msgModel.getAllMessages();
    return result.rows;
  }

  // Delete a message
  static async deleteMessage(id) {
    const result = await msgModel.deleteMessage(id);
    return result;
  }
}

module.exports = MsgService;
