const { db } = require('../db-connection')

async function createContainer(req, res) {
  const { name, description } = await req.body

  if (!name || !description) {
    return res.status(422).json({ error: 'Name and description are required.' })
  }

  try {
    const query = await db.query(`SELECT name FROM containers WHERE name = $1`, [name])

    if (query.rows[0]?.name === name) {
      return res.status(422).json({ error: `Container with that name already exists.` })
    }

    await db.query('INSERT INTO containers(name, description) VALUES($1, $2)', [name, description])

    return res.status(200).json({
      message: 'Succesfully added container to the database.'
    })
  } catch (error) {
    return res.status(500).json({ error: `Error while adding container to the database. ${error}` })
  }
}

module.exports = {
  createContainer
}