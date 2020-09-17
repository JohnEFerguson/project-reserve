'use strict'

module.exports = (sequelize, DataTypes) => {
  const ReserveCategory = sequelize.define('reserve_category', {
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
    size: {
      type: DataTypes.INTEGER,
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

  return ReserveCategory;
};