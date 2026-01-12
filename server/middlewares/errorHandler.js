// if something goes wrong anywhere in your app, this file catches it, logs it, and sends a clean response to the client.
const logger = require("../utils/logger");

// Centralized error-handling middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || "Internal Server Error";

  logger.error(
    `Error: ${errorMessage} | Status: ${statusCode} | Stack: ${err.stack}`
  );

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    error: errorMessage,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Only send stack in development mode
  });
};

module.exports = errorHandler;
