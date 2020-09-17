'use strict'

module.exports = (sequelize, DataTypes) => {
  const NumericCriteria = sequelize.define('numeric_criteria', {
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
    },   
    min: {
      type: DataTypes.INTEGER,
    },
    max: {
      type: DataTypes.INTEGER,
    },   
    ascending: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return NumericCriteria;
};