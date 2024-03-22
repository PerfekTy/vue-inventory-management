const bcrypt = require("bcrypt");
const { db } = require("../db-connection");

async function signUp(req, res) {
  const { name, email, password } = await req.body;

  if (!name || !email || !password) {
    res.json({ error: "Some of the fields are blank." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
      [name, email, hashedPassword]
    );
    res.json({ message: "User succesfully added to the database." });
  } catch (error) {
    res.json({ error: `Error while adding user to the database. ${error}` });
  }
}

module.exports = {
  signUp,
};
