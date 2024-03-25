require('dotenv').config()
const jwt = require('jsonwebtoken')

const expiresIn = 15 * 60 * 1000

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn })
}

const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.status(404).json({ error: 'Session not found.' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      res.status(500).json({ error: 'Token is not valid.' })
    }
    req.user = user
    next()
  })
}

module.exports = {
  createToken,
  validateToken,
  expiresIn
}
