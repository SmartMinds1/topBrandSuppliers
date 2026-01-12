// middlewares/common.js
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const logger = require("../utils/logger");

const commonMiddleware = (app) => {
  app.use(helmet());
  app.use(express.json({ limit: "10kb" }));
  app.use(cookieParser());

  const isDev = process.env.NODE_ENV !== "production";

  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["https://topbrandsuppliers.com"];

  const corsOptions = {
    origin: (origin, callback) => {
      if (
        !origin || // for Postman or same-origin requests
        allowedOrigins.includes(origin) ||
        (isDev && /^http:\/\/localhost:\d+$/.test(origin)) // allow localhost:* in dev
      ) {
        callback(null, true);
      } else {
        logger.warn(`Blocked CORS request from origin: ${origin}`);
        callback(new Error("Blocked by CORS policy"), false);
      }
    },
    credentials: true, // This allows cookies to travel
    exposedHeaders: ["set-cookie"], // Optional: helps browsers see cookies
  };

  app.use(cors(corsOptions));

  logger.info(`CORS and security middlewares initialized`);
};

module.exports = commonMiddleware;
