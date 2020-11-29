'use strict'

const { INTEGER, STRING } = require('sequelize')

module.exports = (sequelize) => {
  const CategoryCriteria = sequelize.define(
    'category_criteria',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: STRING,
      },
      description: {
        type: STRING,
      },
      order: {
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

  return CategoryCriteria
}
