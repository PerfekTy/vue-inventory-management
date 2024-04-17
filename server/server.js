const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bodyParser = require('body-parser')

const { auth } = require('./routes/authentication')
const { users } = require('./routes/users')
const { container } = require('./routes/containers')
const { product } = require('./routes/products')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '500mb' }))
app.use(cors())

app.use('/api', auth)
app.use('/api', users)
app.use('/api', container)
app.use('/api', product)

app.listen(8080)
