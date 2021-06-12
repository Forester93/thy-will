const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DOB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    casket: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ceremony: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allownull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "account",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
