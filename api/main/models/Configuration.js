'use strict'

module.exports = (sequelize, DataTypes) => {
  const Configuration = sequelize.define('configuration', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    supply: {
      type: DataTypes.INTEGER,
    },
    unitType: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return Configuration;
};