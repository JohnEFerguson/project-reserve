'use strict'

const { INTEGER, STRING, BOOLEAN } = require('sequelize')

module.exports = (sequelize) => {
  const Patient = sequelize.define(
    'patient',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      recipient_id: {
        type: STRING,
      },
      name: {
        type: STRING,
      },
      group_allocated_under: {
        type: STRING,
      },
      info: {
        type: STRING,
      },
      given_unit: {
        type: BOOLEAN,
        defaultValue: false,
      },
      rand_number: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
    }
  )

  return Patient
}
