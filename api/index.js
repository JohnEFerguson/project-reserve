'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const env = require('./main/config/env.js')
const db = require('./main/config/db.js')

const patientsRoute = require('./main/routes/patients')
const configurationsRoute = require('./main/routes/configurations')

const app = express()
const PORT = env.PORT

app.use(morgan('combined'))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

const sequelizePromise = db.sequelize.sync({ force: true })

app.use(async (req, res, next) => {
  await sequelizePromise
  req.db = db
  next()
})

app.use(patientsRoute)
app.use(configurationsRoute)

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 8019
  app.listen(PORT, () => {
    console.log('listening on port:', port)
  })
}
