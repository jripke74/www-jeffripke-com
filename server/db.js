const { Pool } = require("pg");

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required. Copy .env.example to .env for local development.");
  }

  const local = /localhost|127\.0\.0\.1/.test(connectionString);
  const sslOff = process.env.DATABASE_SSL === "false" || local;

  return new Pool({
    connectionString,
    ssl: sslOff ? false : { rejectUnauthorized: false },
  });
}

module.exports = { createPool };
