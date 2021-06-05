const User = require("./User");
const Beneficiary = require("./Beneficiary");
const Executor = require("./Executor");
const Asset = require("./Asset");
const AssetApportion = require("./AssetApportion");
const Witness = require("./Witness");

//To-do: Set relationships between tables here.
// User has...

User.hasMany(Asset, { onDelete: "cascade" });
User.hasMany(Beneficiary, { onDelete: "cascade" });
User.hasMany(Executor, { onDelete: "cascade" });
User.hasMany(Witness, { onDelete: "cascade" });

// Belongs to One user

Asset.belongsTo(User, { foreignKey: "user_id" });
Beneficiary.belongsTo(User, { foreignKey: "user_id" });
Executor.belongsTo(User, { foreignKey: "user_id" });
Witness.belongsTo(User, { foreignKey: "user_id" });

// Asset Apportionment Relations

Asset.belongsToMany(Beneficiary, { through: AssetApportion });
Beneficiary.belongsToMany(Asset, { through: AssetApportion });

module.exports = {
  User,
  Beneficiary,
  Executor,
  Asset,
  AssetApportion,
  Witness,
};
