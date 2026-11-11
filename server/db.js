const fs = require("fs");
const { Pool } = require("pg");

const CA_BUNDLES = [
  "/usr/lib/ssl/certs/ca-certificates.crt",
  "/etc/ssl/certs/ca-certificates.crt",
];

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required. Copy .env.example to .env for local development.");
  }

  const local = /localhost|127\.0\.0\.1/.test(connectionString);
  const sslOff = process.env.DATABASE_SSL === "false" || local;

  return new Pool({
    connectionString: sslOff ? connectionString : connectionStringWithoutSslMode(connectionString),
    ssl: sslOff ? false : { rejectUnauthorized: true, ca: readServerCa() },
  });
}

function connectionStringWithoutSslMode(connectionString) {
  const url = new URL(connectionString);
  for (const key of ["sslmode", "ssl", "sslrootcert", "sslcert", "sslkey"]) {
    url.searchParams.delete(key);
  }
  return url.toString();
}

function readServerCa() {
  const bundle = CA_BUNDLES.find((candidate) => fs.existsSync(candidate));
  if (!bundle) {
    throw new Error("The database CA bundle is missing, so the server certificate cannot be checked.");
  }
  return fs.readFileSync(bundle);
}

module.exports = { createPool };
