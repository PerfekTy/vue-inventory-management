const { Router } = require("express");
const router = Router();

router.get("/user", async (req, res) => {
  const query = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

  return query.rows[0];
});

module.exports = {
  users: router,
};
