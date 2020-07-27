'use strict'

module.exports = (sequelize, DataTypes) => {
  const SourceFile = sequelize.define('source_file', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.ENUM('FINISHED','IN_PROGRESS'),
    },
    dateLoaded: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
    }, {
    timestamps: false,
    paranoid: true,
    underscored: true
  });

  return SourceFile;
};
