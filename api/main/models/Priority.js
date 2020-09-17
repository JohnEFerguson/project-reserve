'use strict'

module.exports = (sequelize, DataTypes) => {
  const Priority = sequelize.define('priority', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }  
}, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return Priority;
};
