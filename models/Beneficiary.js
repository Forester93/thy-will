const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Beneficiary extends Model {}

Beneficiary.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DOB: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relationship: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isChild: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isCharity: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    guardian_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guardian_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "beneficiary",
  }
);

module.exports = Beneficiary;
