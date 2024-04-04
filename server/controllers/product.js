const { db } = require('../db-connection')

async function createProduct(req, res) {
  const { name, amount, expire_date, added_by, container_id } = await req.body

  if (!name || !amount || !expire_date) {
    return res.status(422).json({ error: 'Name, amount and expiration date are required.' })
  }

  try {
    await db.query(
      'INSERT INTO products(name, amount, expire_date, added_by, container_id) VALUES($1, $2, $3, $4, $5)',
      [name, amount, expire_date, added_by._value, container_id]
    )

    return res.status(200).json({
      message: 'Succesfully added product.'
    })
  } catch (error) {
    return res.status(500).json({ error: `Error while adding product to the database. ${error}` })
  }
}

async function getProducts(req, res) {
  const containerId = await req.originalUrl.split('/')[3]

  try {
    const query = await db.query(`SELECT * FROM products WHERE container_id = $1`, [containerId])
    const products = query.rows
    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ error: `Error while fetching products. ${error}` })
  }
}

async function deleteProduct(req, res) {
  const productId = await req.originalUrl.split('/')[3]
  try {
    await db.query(`DELETE FROM products WHERE id = $1`, [productId])
    return res.status(200).json({ message: 'Product deleted.' })
  } catch (error) {
    return res.status(500).json({ error: `Error while deleting product. ${error}` })
  }
}

module.exports = {
  createProduct,
  getProducts,
  deleteProduct
}
