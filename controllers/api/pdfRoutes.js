const router = require('express').Router();
const PDFDocument = require('pdfkit');
const withAuth = require('../../utils/auth');
const {
	User,
	Executor,
	Beneficiary,
	Asset,
	AssetApportion,
	Witness,
} = require('../../models');

const executorTemplate = require('../../utils/willGenerator/executorTemplate');
const e = require('express');

router.get('/:id', withAuth, async (req, res) => {
	if (req.session.account_id == req.params.id) {
		try {
			const userInfo = await User.findByPk(req.params.id, {
				include: [
					{
						model: Asset,
					},
					{
						model: Beneficiary,
					},
					{
						model: Executor,
					},
					{
						model: Witness,
					},
					{
						model: AssetApportion,
					},
				],
			});

			const user = userInfo.get({ plain: true });

			console.log(user);

			const date = new Date();

			var currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

			// res.header(
			// 	'Content-Disposition',
			// 	`attachment; filename=${userInfo.getDataValue(
			// 		'first_name'
			// 	)}_${userInfo.getDataValue('last_name')}_last_will_and_testament.pdf`
			// );

			const executors = user.executors;

			const executorTemplate = () => {
				const executorArray = [];
				let executorNumber = 1;
				for (i = 0; i < executors.length; i++) {
					if (!executors[i].isAlternate) {
						executorArray.push(
							`Executor #${executorNumber}

                    Name: ${executors[i].name}
                    Date of Birth: ${executors[i].DOB}
                    Relationship: ${executors[i].relationship}
                    Address: ${executors[i].address}

                `
						);
						executorNumber++;
					}
					let executorString = executorArray.join('');
					return executorString;
				}
			};

			const altExecutorTemplate = () => {
				const executorArray = [];
				let executorNumber = 1;
				for (i = 0; i < executors.length; i++) {
					if (executors[i].isAlternate) {
						executorArray.push(
							`Alternate Executor #${executorNumber}

                    Name: ${executors[i].name}
                    Date of Birth: ${executors[i].DOB}
                    Relationship: ${executors[i].relationship}
                    Address: ${executors[i].address}

                `
						);
						executorNumber++;
					}
				}
				let altExecutorString = executorArray.join('');
				return altExecutorString;
			};

			const beneficiaries = user.beneficiaries;

			const beneficiaryTemplate = () => {
				const beneficiaryArray = [];
				for (i = 0; i < beneficiaries.length; i++) {
					if (!beneficiaries[i].isCharity) {
						beneficiaryArray.push(
							`Beneficiary #${i + 1}
                
                Name: ${beneficiaries[i].name},
                DOB: ${beneficiaries[i].DOB},
                Relationship: ${beneficiaries[i].relationship},
                Address: ${beneficiaries[i].address}

        `
						);
					}
				}
				let beneficiaryString = beneficiaryArray.join('');
				return beneficiaryString;
			};

			const assetsTemplate = () => {
				let assetArray = [];
				for (i = 0; i < assets.length; i++) {
					assetArray.push(`Asset #${assets[i].id}

Description: ${assets[i].description}
Type: ${assets[i].type}
Total value: $${assets[i].value.toFixed(2)}

Apportion instructions: 
${apportionTemplate(assets[i])}
`);
				}
				let assetString = assetArray.join('');
				return assetString;
			};

			const apportionTemplate = (assetID) => {
				let apportionArray = [];
				for (x = 0; x < assetApportions.length; x++) {
					// console.log(assetApportions[x].asset_id);
					// console.log(assetID);
					if (assetApportions[x].asset_id == assetID.id) {
						// console.log(assetApportions[x].beneficiary_id);
						apportionArray.push(`Beneficiary: ${
							beneficiaries[assetApportions[x].beneficiary_id - 1].name
						}
Instruction: ${assetApportions[x].apportion_instructions}
Apportion value: $${(assetID.value * assetApportions[x].percentage).toFixed(2)}

`);
					}
				}
				let apportionString = apportionArray.join('');
				return apportionString;
			};

			const witnesses = user.witnesses;

			const witnessTemplate = () => {
				const witnessArray = [];
				for (i = 0; i < witnesses.length; i++) {
					witnessArray.push(
						`Witness #${i + 1}
                
                Name: ${witnesses[i].name},
                Relationship: ${witnesses[i].relationship},
                Address: ${witnesses[i].address},
                
                Date signed: ______________



                ___________________________
                Signature

        `
					);
				}
				let witnessString = witnessArray.join('');
				return witnessString;
			};

			const assets = user.assets;

			const assetApportions = user.asset_apportions;

			console.log(assets);

			console.log(assetApportions);

			const doc = new PDFDocument();

			doc.pipe(res);

			doc.text(`Last Will and Testament

    This will dated ${currentDate} is made by me, ${user.name}, ${
				user.occupation
			}, of ${user.address}.
    
    Executors

    The following executors will be responsible for the distribution of my assets as directed by this will.
    
    ${executorTemplate()}
    Alternate executors

    If the above executors are unavailable, the following alternate executors will take their place.
    
    ${altExecutorTemplate()}
List of Beneficiaries

    The following list contians all people who are beneficiaries to my estate:
    
    ${beneficiaryTemplate()}

Assets

Below is a list of all my assets included in this will. Any assets not described in this will shall be divided as per the guidance of my executors.

${assetsTemplate()}

    Witnesses
    
    The following people have witnessed my signature and initial on each page of this will:
    
    ${witnessTemplate()}
    
    Declaration
    
    I, ${
			user.name
		}, declare the above and all included in this document to be my last will and testament.
    
    
    ___________________________
    Signature


    ___________________________
    Date signed
    `);

			doc.end();

			console.log('done');
		} catch (err) {
			res.status(403).json(err);
		}
	} else {
		console.log('redirecting');
		res.redirect('/');
	}
});

module.exports = router;
