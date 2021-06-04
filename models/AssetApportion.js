const sequelize = require("../config/connection");
const { Model, DataTypes } = require("sequelize");

class AssetApportion extends Model {}

AssetApportion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    asset_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "asset",
        key: "id",
      },
    },
    beneficiary_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "beneficiary",
        key: "id",
      },
    },
    percentage: {
      type: DataTypes.DECIMAL(4, 3),
      allowNull: false,
    },
    apportion_instructions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "asset_apportion",
  }
);

module.exports = AssetApportion;
