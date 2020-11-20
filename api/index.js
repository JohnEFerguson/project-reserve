'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const { Nuxt, Builder } = require('nuxt')

const config = require('../nuxt.config')
const env = require('./main/config/env')
const db = require('./main/config/db')

const patientsRoute = require('./main/routes/patients')
const configurationsRoute = require('./main/routes/configurations')
const sourceFilesRoute = require('./main/routes/source_files')

const app = express()
// We instantiate Nuxt.js with the options
const isProd = process.env.NODE_ENV === 'production'
config.dev = !isProd

const nuxt = new Nuxt(config)
// Start build process in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}
app.use(nuxt.render)

const PORT = env.PORT

app.db = db

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
app.use(sourceFilesRoute)

module.exports = app

if (require.main === module) {
  const port = process.env.PORT || 8019
  app.listen(PORT, () => {
    console.log('listening on port:', port)
  })
}
