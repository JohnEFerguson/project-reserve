'use strict'

const { INTEGER } = require("sequelize");

module.exports = (sequelize) => {

  const NumericCriteriaPatientValue = sequelize.define('numeric_criteria_patient_value', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    value: {
      type: INTEGER,
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return NumericCriteriaPatientValue;
}