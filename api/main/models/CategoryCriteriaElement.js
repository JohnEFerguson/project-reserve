'use strict'

module.exports = (sequelize, DataTypes) => {
  const CategoryCriteriaElement = sequelize.define('category_criteria_element', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
    },
    order: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return CategoryCriteriaElement;
};