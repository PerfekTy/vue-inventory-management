require('dotenv').config()
const { Router } = require('express')
const { validateToken } = require('../controllers/jwt')
const { createContainer, getContainers, deleteContainer } = require('../controllers/container')
const router = Router()

router.post('/new-container', validateToken(process.env.JWT_CREATE_SECRET), createContainer)
router.get('/all-containers', validateToken(process.env.JWT_CREATE_SECRET), getContainers)
router.delete(
  '/delete-container/:containerId',
  validateToken(process.env.JWT_CREATE_SECRET),
  deleteContainer
)

module.exports = {
  container: router
}
