const { Pool } = require("pg");

const pool = new Pool({
  user: "yourUser",
  host: "localhost",
  database: "yourDatabase",
  password: "yourPassword",
  max: 10,
  min:5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

module.exports = pool;
