const router = require('express').Router();
const userRoutes = require('./userRoutes');
const pdfRoutes = require('./pdfRoutes');

router.use('/users', userRoutes);

router.use('/pdf', pdfRoutes);

module.exports = router;
