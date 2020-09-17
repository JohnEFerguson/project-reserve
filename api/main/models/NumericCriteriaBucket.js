'use strict'

module.exports = (sequelize, DataTypes) => {
  const NumericCriteriaBucket = sequelize.define('numeric_criteria_bucket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    min: {
      type: DataTypes.INTEGER,
    },
    max: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return NumericCriteriaBucket;
};