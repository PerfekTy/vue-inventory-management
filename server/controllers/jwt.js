require('dotenv').config()
const jwt = require('jsonwebtoken')

const expiresIn = 60 * 10
const expiresInRefresh = 60 * 60

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_CREATE_SECRET, { expiresIn })
}

const createRefreshToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_REFRESH_SECRET, { expiresIn: expiresInRefresh })
}

const refreshToken = (req, res) => {
  const authHeader = req.headers['authorization']
  const refreshToken = authHeader && authHeader.split(' ')[1]

  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token not provided.' })
  }

  try {
    const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const user = decodedRefreshToken.user

    const token = createToken(user)

    if (!token) {
      return res.status(500).json({ error: 'Error while refreshing access token.' })
    }

    return res.status(200).json({ token })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Error while decoding refresh token or generating new access token.' + error })
  }
}

const validateToken = (secret) => (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(404).json({ error: 'Session not found.' })
  }

  jwt.verify(token, secret, (error, user) => {
    if (error) {
      return res.status(500).json({ error: 'Token is not valid.' })
    }
    req.user = user
    next()
  })
}

module.exports = {
  createToken,
  createRefreshToken,
  refreshToken,
  validateToken,
  expiresIn
}
