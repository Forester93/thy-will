const router = require('express').Router();
const accountRoutes = require('./accountRoutes');
const pdfRoutes = require('./pdfRoutes');
const userRoutes = require('./userRoutes');
const beneficiaryRoutes = require('./beneficiaryRoutes');
const witnessRoutes = require('./witnessRoutes');

router.use('/accounts', accountRoutes);

router.use('/beneficiary', beneficiaryRoutes);

router.use('/witness', witnessRoutes);

router.use('/pdf', pdfRoutes);

router.use('/users', userRoutes);

module.exports = router;
