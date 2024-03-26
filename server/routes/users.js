require('dotenv').config()
const { Router } = require('express')
const { validateToken } = require('../controllers/jwt')
const { getCurrentUser } = require('../controllers/user')
const router = Router()

router.get('/current-user', validateToken(process.env.JWT_CREATE_SECRET), getCurrentUser)

module.exports = {
  users: router
}
