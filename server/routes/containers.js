require('dotenv').config()
const { Router } = require('express')
const { validateToken } = require('../controllers/jwt')
const { createContainer } = require('../controllers/container')
const router = Router()

router.post('/new-container', validateToken(process.env.JWT_CREATE_SECRET), createContainer)

module.exports = {
  container: router
}