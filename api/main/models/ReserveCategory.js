'use strict'

const { INTEGER, STRING, BOOLEAN } = require("sequelize");

module.exports = (sequelize) => {

  const ReserveCategory = sequelize.define('reserve_category', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: STRING,
    },
    isDefault: {
      type: BOOLEAN,
      defaultValue: false
    },
    description: {
      type: STRING,
    },
    size: {
      type: INTEGER,
    },
    order: {
      type: INTEGER,
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return ReserveCategory;
};