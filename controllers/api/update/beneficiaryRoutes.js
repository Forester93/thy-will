const router = require('express').Router();
const withAuth = require('../../../utils/auth');
const { Beneficiary } = require('../../../models');

router.put('/:id', withAuth, async (req, res) => {
	Beneficiary.update(
		{
			name: req.body.name,
			address: req.body.address,
			DOB: req.body.dob,
			relationship: req.body.relationship,
			isChild: req.body.isChild,
			isCharity: req.body.isCharity,
			guardian_name: req.body.guardian_name,
			guardian_address: req.body.guardian_address,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then((update) => {
			res.json(update);

			res.redirect('/');
		})
		.catch((err) => {
			console.log(err);
			res.json(err);
		});
});

router.get('/', async (req, res) => {
	try {
		const beneficiaryUpdate = await Beneficiary.findAll();

		console.log(beneficiaryUpdate);

		res.redirect('../../profile');
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
