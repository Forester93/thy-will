const router = require('express').Router();
const withAuth = require('../../../utils/auth');
const { User, Beneficiary } = require('../../../models');

router.get('/:id', async (req, res) => {
	const beneficiaryUpdate = Beneficiary.findByPk(req.params.id);

	console.log(beneficiaryUpdate);
});

module.exports = router;
