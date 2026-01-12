//This file handles all the required business logic for all user routes
const userModel = require("../models/userModel");

class UserService {
  // Get all Users
  static async getAllUsers() {
    const result = await userModel.getAllUsers();
    return result.rows;
  }

  // Delete a User
  static async deleteUser(id) {
    const result = await userModel.deleteUser(id);
    return result;
  }
}

module.exports = UserService;
