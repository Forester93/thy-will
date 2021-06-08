const router = require('express').Router();
const apportionRoutes = require('./apportionRoutes');
const assetRoutes = require('./assetRoutes');
const executorRoutes = require('./executorRoutes');
const beneficiaryRoutes = require('./beneficiaryRoutes');
const witnessRoutes = require('./witnessRoutes');

router.use('/beneficiary', beneficiaryRoutes);
router.use('/asset', assetRoutes);
router.use('/executor', executorRoutes);
router.use('/witness', witnessRoutes);
router.use('/apportion', apportionRoutes);

module.exports = router;
