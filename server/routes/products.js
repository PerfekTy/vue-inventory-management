require('dotenv').config()
const { Router } = require('express')
const { validateToken } = require('../controllers/jwt')
const { createProduct, getProducts, deleteProduct } = require('../controllers/product')
const router = Router()

router.post('/new-product', validateToken(process.env.JWT_CREATE_SECRET), createProduct)
router.get('/all-products/:containerId', validateToken(process.env.JWT_CREATE_SECRET), getProducts)
router.delete(
  '/delete-product/:productId',
  validateToken(process.env.JWT_CREATE_SECRET),
  deleteProduct
)

module.exports = {
  product: router
}
