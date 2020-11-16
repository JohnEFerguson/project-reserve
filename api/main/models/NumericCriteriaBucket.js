'use strict'

const { INTEGER, STRING } = require("sequelize");

module.exports = (sequelize) => {

  const NumericCriteriaBucket = sequelize.define('numeric_criteria_bucket', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    order: {
      type: INTEGER,
    },
    min: {
      type: INTEGER,
    },
    max: {
      type: INTEGER,
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return NumericCriteriaBucket;
};