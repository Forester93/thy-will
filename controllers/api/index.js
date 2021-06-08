const router = require('express').Router();
const crudRoutes = require('./crud');
const accountRoutes = require('./accountRoutes');
const pdfRoutes = require('./pdfRoutes');
const userRoutes = require('./userRoutes');

router.use('/crud', crudRoutes);
router.use('/accounts', accountRoutes);
router.use('/pdf', pdfRoutes);
router.use('/users', userRoutes);

module.exports = router;
