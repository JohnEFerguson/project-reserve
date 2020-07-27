'use strict'

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('patient', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    public_id: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true
  });

  return Patient;
};
