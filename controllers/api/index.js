const router = require("express").Router();
const accountRoutes = require("./accountRoutes");
const pdfRoutes = require("./pdfRoutes");

router.use("/accounts", accountRoutes);

router.use("/pdf", pdfRoutes);

module.exports = router;
