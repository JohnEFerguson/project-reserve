'use strict'

const Sequelize = require('sequelize')
const env = require('./env')
const sequelize = new Sequelize(
  env.DATABASE,
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD,
  {
    dialect: env.DATABASE_DIALECT,
    storage: env.DATABASE_STORAGE,
    define: {
      underscored: true,
    },
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.patient = require('../models/Patient.js')(sequelize, Sequelize)
db.sourceFile = require('../models/SourceFile.js')(sequelize, Sequelize)

db.sourceFile.hasMany(db.patient)

module.exports = db
