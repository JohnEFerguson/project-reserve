'use strict'

const { INTEGER, STRING, DATE, ENUM, NOW } = require("sequelize");

module.exports = (sequelize) => {
  const SourceFile = sequelize.define('source_file', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: STRING,
    },
    state: {
      type: ENUM('FINISHED','IN_PROGRESS'),
    },
    dateLoaded: {
      type: DATE,
      defaultValue: NOW
    }
    }, {
    timestamps: false,
    paranoid: true,
    underscored: true
  });

  return SourceFile;
};
