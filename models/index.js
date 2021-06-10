const User = require("./User");
const Beneficiary = require("./Beneficiary");
const Executor = require("./Executor");
const Asset = require("./Asset");
const AssetApportion = require("./AssetApportion");
const Witness = require("./Witness");
const Account = require("./Account");

// Account has ...

Account.hasOne(User, { onDelete: "cascade" });
User.belongsTo(Account, { foreignKey: "accound_id" });

// User has...

User.hasMany(Asset, { foreignKey: "user_id", onDelete: "cascade" });
User.hasMany(Beneficiary, { foreignKey: "user_id", onDelete: "cascade" });
User.hasMany(Executor, { foreignKey: "user_id", onDelete: "cascade" });
User.hasMany(Witness, { foreignKey: "user_id", onDelete: "cascade" });
User.hasMany(AssetApportion, { foreignKey: "user_id", onDelete: "cascade" });

// Belongs to One user

Asset.belongsTo(User, { foreignKey: "user_id" });
Beneficiary.belongsTo(User, { foreignKey: "user_id" });
Executor.belongsTo(User, { foreignKey: "user_id" });
Witness.belongsTo(User, { foreignKey: "user_id" });

// Asset Apportionment Relations

Asset.belongsToMany(Beneficiary, {
  through: AssetApportion,
  onDelete: "set null",
});
Beneficiary.belongsToMany(Asset, {
  through: AssetApportion,
  onDelete: "set null",
});
AssetApportion.belongsTo(User, { foreignKey: "user_id", onDelete: "cascade" });

module.exports = {
  User,
  Beneficiary,
  Executor,
  Asset,
  AssetApportion,
  Witness,
  Account,
};
