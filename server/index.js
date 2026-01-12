// Main entry point
require("dotenv").config();
const express = require("express");
const pool = require("./database/db");
const logger = require("./utils/logger");
const errorHandler = require("./middlewares/errorHandler");
const commonMiddleware = require("./middlewares/common");

const app = express();
const PORT = process.env.PORT || 5000;

/* ------------------------------
   1. SECURITY & MIDDLEWARE SETUP
--------------------------------*/
app.set("trust proxy", 1); // Required for HTTPS redirect behind proxies
commonMiddleware(app); // Your custom common middleware

// Temporary cookie test route
app.get("/api/test-cookie", (req, res) => {
  console.log("Cookies received:", req.cookies);
  res.json(req.cookies);
});

// Redirect HTTP to HTTPS in production (but not localhost)
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (
      req.headers["x-forwarded-proto"] !== "https" &&
      req.hostname !== "localhost"
    ) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

/* ------------------------------
   2. ROUTES
--------------------------------*/
//importing & Registering my routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/mpesa", require("./routes/mpesaRoutes"));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "API is running" });
});

/* ------------------------------
   3. ERROR HANDLING
--------------------------------*/
app.use(errorHandler);

/* ------------------------------
   4. SERVER STARTUP
--------------------------------*/
app.listen(PORT, () => {
  logger.info(` Server is running on http://localhost:${PORT}`);
});

/* ------------------------------
   5. GRACEFUL SHUTDOWN
--------------------------------*/
process.on("SIGINT", async () => {
  try {
    logger.info(" Shutting down server...");
    await pool.end();
    logger.info(" PostgreSQL pool closed.");
    process.exit(0);
  } catch (err) {
    logger.error(` Error closing PostgreSQL pool: ${err.message}`);
    process.exit(1);
  }
});
