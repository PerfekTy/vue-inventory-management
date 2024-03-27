require('dotenv').config()
const { Router } = require('express')
const { validateToken } = require('../controllers/jwt')
const { createContainer, getContainers } = require('../controllers/container')
const router = Router()

router.post('/new-container', validateToken(process.env.JWT_CREATE_SECRET), createContainer)
router.get('/all-containers', validateToken(process.env.JWT_CREATE_SECRET), getContainers)

module.exports = {
  container: router
}
