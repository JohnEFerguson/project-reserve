'use strict'

module.exports = (sequelize, DataTypes) => {
  const CategoryCriteria = sequelize.define('category_criteria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
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

  return CategoryCriteria;
};