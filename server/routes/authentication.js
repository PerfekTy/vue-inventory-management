const { Router } = require('express')
const { signUp, signIn } = require('../controllers/auth-controller')
const { refreshToken } = require('../controllers/jwt')
const router = Router()

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/refresh-token', refreshToken)

module.exports = {
  auth: router
}
