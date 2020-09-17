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

db.sequelize = sequelize

db.patient = require('../models/Patient.js')(sequelize)
db.sourceFile = require('../models/SourceFile.js')(sequelize)
db.configuration = require('../models/Configuration.js')(sequelize)
db.reserveCategory = require('../models/ReserveCategory.js')(sequelize)
db.priority = require('../models/Priority.js')(sequelize)
db.categoryCriteria = require('../models/CategoryCriteria.js')(sequelize)
db.categoryCriteriaElement = require('../models/CategoryCriteriaElement.js')(sequelize)
db.numericCriteria = require('../models/NumericCriteria.js')(sequelize)
db.numericCriteriaBucket = require('../models/NumericCriteriaBucket.js')(sequelize)


db.sourceFile.hasMany(db.patient)
db.sourceFile.hasOne(db.configuration)
db.configuration.reserveCategories = db.configuration.hasMany(db.reserveCategory, { as: "reserveCategories" })
db.reserveCategory.priority = db.reserveCategory.hasOne(db.priority)
db.patient.hasMany(db.reserveCategory)
db.priority.categoryCriteria = db.priority.hasMany(db.categoryCriteria, { as: "categoryCriteria" })
db.priority.numericCriteria = db.priority.hasMany(db.numericCriteria, { as: "numericCriteria" })
db.categoryCriteria.categoryCriteriaElement = db.categoryCriteria.hasMany(db.categoryCriteriaElement, { as: 'elements' })
db.numericCriteria.numericCriteriaBucket = db.numericCriteria.hasMany(db.numericCriteriaBucket, { as: 'bins' })

module.exports = db
