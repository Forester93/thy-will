const router = require("express").Router();
const accountRoutes = require("./accountRoutes");
const pdfRoutes = require("./pdfRoutes");
const userRoutes = require("./userRoutes");
const assetRoutes = require("./assetRoutes");
const beneficiaryRoutes = require("./beneficiaryRoutes");
const executorRoutes = require("./executorRoutes");
const witnessRoutes = require("./witnessRoutes");
const assetApportionRoutes = require("./assetApportionRoutes");

router.use("/accounts", accountRoutes);

router.use("/asset", assetRoutes);

router.use("/beneficiary", beneficiaryRoutes);

router.use("/executor", executorRoutes);

router.use("/witness", witnessRoutes);

router.use("/pdf", pdfRoutes);

router.use("/users", userRoutes);

router.use("/assetapportion/", assetApportionRoutes);

module.exports = router;
