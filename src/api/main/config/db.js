'use strict'

module.exports = function (storagePath) {

  const Sequelize = require('sequelize')
  const env = require('./env')
  const sequelize = new Sequelize(
    env.DATABASE,
    env.DATABASE_USERNAME,
    env.DATABASE_PASSWORD,
    {
      dialect: env.DATABASE_DIALECT,
      storage: storagePath + '/data.sqlite',
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
  db.patientReserveCategory = require('../models/PatientReserveCategory.js')(
    sequelize
  )
  db.priority = require('../models/Priority.js')(sequelize)
  db.categoryCriteria = require('../models/CategoryCriteria.js')(sequelize)
  db.categoryCriteriaElement = require('../models/CategoryCriteriaElement.js')(
    sequelize
  )
  db.categoryCriteriaPatientValue = require('../models/CategoryCriteriaPatientValue.js')(
    sequelize
  )
  db.numericCriteria = require('../models/NumericCriteria.js')(sequelize)
  db.numericCriteriaBucket = require('../models/NumericCriteriaBucket.js')(
    sequelize
  )
  db.numericCriteriaPatientValue = require('../models/NumericCriteriaPatientValue.js')(
    sequelize
  )

  // one to many relationship between source_file and patient
  db.sourceFile.hasMany(db.patient, { foreignKey: { allowNull: false } })
  db.patient.belongsTo(db.sourceFile)

  // one to many relationship between configuration and patient
  db.configuration.hasMany(db.patient, { foreignKey: { allowNull: false } })
  db.patient.belongsTo(db.configuration)

  // one to many relationship between configuration and source file
  db.configuration.hasMany(db.sourceFile, { foreignKey: { allowNull: false } })
  db.sourceFile.belongsTo(db.configuration)

  db.configuration.reserveCategories = db.configuration.hasMany(
    db.reserveCategory,
    { as: 'reserveCategories' }
  )
  db.reserveCategory.priority = db.reserveCategory.hasOne(db.priority)
  db.patient.reserveCategories = db.patient.belongsToMany(db.reserveCategory, {
    through: db.patientReserveCategory,
    as: 'reserveCategories',
  })
  db.reserveCategory.belongsToMany(db.patient, {
    through: db.patientReserveCategory,
  })
  db.patient.belongsToMany(db.numericCriteriaBucket, {
    through: db.numericCriteriaPatientValue,
  })
  db.patient.belongsToMany(db.categoryCriteriaElement, {
    through: db.categoryCriteriaPatientValue,
  })
  db.categoryCriteriaElement.belongsToMany(db.patient, {
    through: db.categoryCriteriaPatientValue,
  })
  db.numericCriteriaBucket.belongsToMany(db.patient, {
    through: db.numericCriteriaPatientValue,
  })
  db.priority.categoryCriteria = db.priority.hasMany(db.categoryCriteria, {
    as: 'categoryCriteria',
  })
  db.priority.numericCriteria = db.priority.hasMany(db.numericCriteria, {
    as: 'numericCriteria',
  })
  db.categoryCriteria.categoryCriteriaElement = db.categoryCriteria.hasMany(
    db.categoryCriteriaElement,
    { as: 'elements' }
  )
  db.numericCriteria.numericCriteriaBucket = db.numericCriteria.hasMany(
    db.numericCriteriaBucket,
    { as: 'bins' }
  )

  return db

}