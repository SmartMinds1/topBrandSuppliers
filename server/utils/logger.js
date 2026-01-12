// Centralized logger using Winston. It writes down what happened, when, how serious it was, and sometimes which file did it.
const { createLogger, format, transports } = require("winston");

const isProd = process.env.NODE_ENV === "production";

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: isProd
    ? format.combine(format.timestamp(), format.json())
    : format.combine(
        format.colorize(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.printf(({ timestamp, level, message, stack }) =>
          stack
            ? `${timestamp} [${level}]: ${message}\n${stack}`
            : `${timestamp} [${level}]: ${message}`
        )
      ),
  transports: [new transports.Console({ handleExceptions: true })],
  exitOnError: false,
});

module.exports = logger;
