'use strict'

const { INTEGER } = require("sequelize");

module.exports = (sequelize) => {

  const PatientReserveCategory = sequelize.define('patient_reserve_category', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }  
}, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return PatientReserveCategory;
};
