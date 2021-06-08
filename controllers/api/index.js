const router = require('express').Router();
const accountRoutes = require('./accountRoutes');
const pdfRoutes = require('./pdfRoutes');
const userRoutes = require('./userRoutes');
const beneficiaryRoutes = require('./beneficiaryRoutes');

router.use('/accounts', accountRoutes);

router.use('/beneficiary', beneficiaryRoutes);

router.use('/pdf', pdfRoutes);

router.use('/users', userRoutes);

module.exports = router;
