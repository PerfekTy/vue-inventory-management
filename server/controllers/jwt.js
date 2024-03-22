require("dotenv").config();
const jwt = require("jsonwebtoken");

const expiresIn = 15 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

const validateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(404).json({ error: "Session not found." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      res.status(500).json({ error: "Token is not valid." });
    }
    console.log(decodedToken);
    next();
  });
};

module.exports = {
  createToken,
  validateToken,
  expiresIn,
};
