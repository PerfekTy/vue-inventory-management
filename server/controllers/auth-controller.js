const bcrypt = require("bcrypt");
const { db } = require("../db-connection");
const { createToken, expiresIn } = require("./jwt");

async function signUp(req, res) {
  const { name, email, password } = await req.body;

  if (!name || !email || !password) {
    res.status(422).json({ error: "Some of the fields are blank." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
      [name, email, hashedPassword]
    );

    const user = await db.query(`SELECT id FROM users WHERE email = $1`, [
      email,
    ]);

    const token = createToken(user.rows[0].id);

    res.cookie("token", token, { httpOnly: true, maxAge: expiresIn + 1000 });

    res.status(200).json({
      message: "User succesfully added to the database and logged in.",
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error while adding user to the database. ${error}` });
  }
}

async function signIn(req, res) {
  const { email, password } = await req.body;

  if (!email || !password) {
    res.status(422).json({ error: "Some of the fields are blank." });
  }

  try {
    const query = await db.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);

    const user = query.rows[0];

    if (!user) {
      res.status(404).json({ error: "Not found user with that email." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(422).json({ error: "Incorrect password, try again." });
    }

    const token = createToken(user.id);

    res.cookie("token", token, { httpOnly: true, maxAge: expiresIn + 1000 });

    res.status(200).json({
      message: "User succesfully authenticated.",
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error while logging in user to the service. ${error}` });
  }
}

module.exports = {
  signUp,
  signIn,
};
