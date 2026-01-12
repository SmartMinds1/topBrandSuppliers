// Redis client instance for blacklisting tokens. It improves security by Preventing reuse of tokens after logout

const redis = require("redis");
const logger = require("./logger");

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const client = redis.createClient({ url: REDIS_URL });

client.on("error", (err) => {
  logger.error(`Redis error: ${err.message}`);
});

client
  .connect()
  .then(() => logger.info("Connected to Redis"))
  .catch((err) => logger.error(`Failed to connect to Redis: ${err.message}`));

// Graceful shutdown
process.on("SIGINT", async () => {
  await client.quit();
  logger.info("Redis connection closed.");
  process.exit(0);
});

module.exports = client;
