'use strict'

const { INTEGER, STRING } = require("sequelize");

module.exports = (sequelize) => {

  const Priority = sequelize.define('priority', {
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

  return Priority;
};
