require("dotenv").config();
const { Pool } = require("pg");

const db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  host: "",
});

module.exports = {
  db,
};
