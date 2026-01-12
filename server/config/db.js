const { Pool } = require("pg");
const logger = require("../utils/logger");

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || "",
  host: process.env.DB_HOST || "",
  database: process.env.DB_NAME || "",
  password: process.env.DB_PASSWORD || "",
  port: process.env.DB_PORT || 5432,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // 10 seconds timeout for acquiring a connection

  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

// Test the connection to ensure it's working
(async () => {
  try {
    const client = await pool.connect();
    logger.info("Connected to PostgreSQL database");
    client.release(); // Release the connection back to the pool
  } catch (err) {
    logger.error(`PostgreSQL connection failed: ${err.message}`);
    process.exit(1); // Exit the process if the connection fails
  }
})();

// Handle errors in the pool
pool.on("error", (err) => {
  logger.error(`Unexpected PostgreSQL connection error: ${err.message}`);
});

module.exports = pool;
