'use strict'

const { INTEGER, STRING } = require("sequelize");

module.exports = (sequelize) => {

  const CategoryCriteriaPatientValue = sequelize.define('category_criteria_patient_value', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    value: {
      type: STRING,
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return CategoryCriteriaPatientValue;
};