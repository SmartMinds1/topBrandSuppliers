//This file provides a simplified query for use within our models when sending queries
const pool = require("../config/db");

// Simple query wrapper
const query = (text, params) => pool.query(text, params);

module.exports = { query };
