var base64Img = require('base64-img')
const { db } = require('../db-connection')
const { product } = require('../routes/products')

async function getCurrentUser(req, res) {
  const currentUser = await req.user
  res.json(currentUser)
}

async function getUser(req, res) {
  const { id } = await req.user.user
  try {
    const query = await db.query(`SELECT * FROM users WHERE id = $1`, [id])
    const user = query.rows[0]
    const userWithoutPassword = { ...user }
    delete userWithoutPassword.password
    return res.status(200).json(userWithoutPassword)
  } catch (error) {
    return res.status(500).json({ error: `Error while fetching user. ${error}` })
  }
}

async function updateUserProfile(req, res) {
  const { name, email, image, userId } = await req.body

  try {
    if (image) {
      base64Img.img(image, `public/${userId}`, 'public', async (err) => {
        if (err) {
          return res.status(500).json({ error: `Error while saving image. ${err}` })
        }
        await db.query(`UPDATE users SET image = $1 WHERE id = $2`, [image, userId])
      })
    }

    await db.query(`UPDATE users SET name = $1, email = $2 WHERE id = $3`, [name, email, userId])

    return res.status(200).json({ message: 'User updated.' })
  } catch (error) {
    return res.status(500).json({ error: `Error while updating user. ${error}` })
  }
}

module.exports = {
  getCurrentUser,
  updateUserProfile,
  getUser
}
