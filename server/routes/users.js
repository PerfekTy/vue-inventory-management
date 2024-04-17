require('dotenv').config()
const { Router } = require('express')
const { validateToken } = require('../controllers/jwt')
const { getCurrentUser, updateUserProfile, getUser } = require('../controllers/user')
const router = Router()

router.get('/current-user', validateToken(process.env.JWT_CREATE_SECRET), getCurrentUser)
router.get('/get-user', validateToken(process.env.JWT_CREATE_SECRET), getUser)
router.patch('/edit-user/:userId', validateToken(process.env.JWT_CREATE_SECRET), updateUserProfile)

module.exports = {
  users: router
}
