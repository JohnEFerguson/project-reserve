'use strict'

const { INTEGER, STRING, BOOLEAN } = require("sequelize");

module.exports = (sequelize) => {

  const NumericCriteria = sequelize.define('numeric_criteria', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
    min: {
      type: INTEGER,
    },
    max: {
      type: INTEGER,
    },
    ascending: {
      type: BOOLEAN,
    },
    coarsened: {
      type: BOOLEAN,
    }

  }, {
      timestamps: false,
      paranoid: true,
      underscored: true,
      freezeTableName: true
    });

  return NumericCriteria;
};