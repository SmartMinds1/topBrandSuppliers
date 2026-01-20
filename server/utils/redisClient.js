// redisClient.js
const redis = require("redis");
const logger = require("./logger");

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("REDIS_URL is missing in environment variables");
}

const client = redis.createClient({ url: REDIS_URL });

client.on("connect", () => {
  logger.info("Redis client connecting...");
});

client.on("ready", () => {
  logger.info("Redis client ready");
});

client.on("error", (err) => {
  logger.error(`Redis error: ${err.message}`);
});

(async () => {
  try {
    await client.connect();
    logger.info("Connected to Redis");
  } catch (err) {
    logger.error(`Failed to connect to Redis: ${err.message}`);
  }
})();

// Graceful shutdown
process.on("SIGINT", async () => {
  try {
    await client.quit();
    logger.info("Redis connection closed.");
  } catch (err) {
    logger.error("Error closing Redis:", err);
  }
  process.exit(0);
});

module.exports = client;
