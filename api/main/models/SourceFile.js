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
    nth_reserve_patients: {
      type: STRING,
    },
    left_over: {
      type: INTEGER,
    },
    status: {
      type: ENUM('READY_TO_PROCESS', 'FINISHED', 'IN_PROGRESS', 'ERROR'),
      defaultValue: 'READY_TO_PROCESS'
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
