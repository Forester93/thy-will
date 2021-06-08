const router = require('express').Router();
const withAuth = require('../../../utils/auth');
const { User, Beneficiary } = require('../../../models');

router.put('/:id', async (req, res) => {
	Beneficiary.update(
		{
			name: req.body.name,
			address: req.body.address,
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
