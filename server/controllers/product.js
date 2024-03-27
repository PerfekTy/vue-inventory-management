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
      message: 'Succesfully added product to the database.'
    })
  } catch (error) {
    return res.status(500).json({ error: `Error while adding product to the database. ${error}` })
  }
}

async function getProducts(req, res) {
  try {
    const query = await db.query(`SELECT * FROM products`)
    const products = query.rows
    return res.status(200).json(products)
  } catch (error) {
    return res.status(500).json({ error: `Error while fetching products. ${error}` })
  }
}

module.exports = {
  createProduct,
  getProducts
}
