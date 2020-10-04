'use strict'

const { INTEGER, STRING } = require("sequelize");

module.exports = (sequelize) => {

  const CategoryCriteriaElement = sequelize.define('category_criteria_element', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: STRING,
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

  return CategoryCriteriaElement;
};