require('dotenv').config()
const { Router } = require('express')
const { validateToken } = require('../controllers/jwt')
const { createProduct, getProducts } = require('../controllers/product')
const router = Router()

router.post('/new-product', validateToken(process.env.JWT_CREATE_SECRET), createProduct)
router.get('/all-products', validateToken(process.env.JWT_CREATE_SECRET), getProducts)

module.exports = {
  product: router
}
