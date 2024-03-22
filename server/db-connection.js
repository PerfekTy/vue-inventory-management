const { Pool } = require("pg");
const db = new Pool({
  user: "postgres",
  host: "",
  database: "inv-managment",
  password: "postgres",
  port: "5432",
  max: 20,
  idleTimeoutMillis: 30000,
});

// pool.query("SELECT * FROM users", (err, result) => {
//   if (err) {
//     console.error("Error executing query:", err);
//   } else {
//     console.log("Query result:", result.);
//   }
// });

module.exports = {
  db,
};
