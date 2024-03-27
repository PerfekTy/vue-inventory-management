const bcrypt = require('bcrypt')
const { db } = require('../db-connection')
const { createToken, createRefreshToken } = require('./jwt')

async function signUp(req, res) {
  const { name, email, password } = await req.body

  if (!name || !email || !password) {
    return res.status(422).json({ error: 'Some of the fields are blank.' })
  }

  try {
    const query = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

    if (query.rows[0]?.email === email) {
      return res.status(422).json({ error: 'User with that email already exists.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', [
      name,
      email,
      hashedPassword
    ])

    const existingUser = await db.query(`SELECT * FROM users WHERE email = $1`, [email])
    const user = existingUser.rows[0]

    const userWithoutPassword = { ...user }
    delete userWithoutPassword.password

    const token = createToken(userWithoutPassword)
    const refreshToken = createRefreshToken(userWithoutPassword)

    return res.status(200).json({
      message: 'User succesfully added to the database and logged in.',
      token,
      refreshToken
    })
  } catch (error) {
    return res.status(500).json({ error: `Error while adding user to the database. ${error}` })
  }
}

async function signIn(req, res) {
  const { email, password } = await req.body

  if (!email || !password) {
    return res.status(422).json({ error: 'Some of the fields are blank.' })
  }

  try {
    const query = await db.query(`SELECT * FROM users WHERE email = $1`, [email])

    const user = query.rows[0]

    if (!user) {
      return res.status(404).json({ error: 'Not found user with that email.' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(422).json({ error: 'Incorrect password, try again.' })
    }

    const userWithoutPassword = { ...user }
    delete userWithoutPassword.password

    const token = createToken(userWithoutPassword)
    const refreshToken = createRefreshToken(userWithoutPassword)

    return res.status(200).json({
      token,
      refreshToken
    })
  } catch (error) {
    return res.status(500).json({ error: `Error while logging in user to the service. ${error}` })
  }
}

module.exports = {
  signUp,
  signIn
}
