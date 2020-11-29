'use strict'

const { INTEGER, STRING } = require('sequelize')

module.exports = (sequelize) => {
  const Configuration = sequelize.define(
    'configuration',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      supply: {
        type: INTEGER,
      },
      unitType: {
        type: STRING,
      },
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
    }
  )

  return Configuration
}
