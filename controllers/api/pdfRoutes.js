const router = require('express').Router();
// const withAuth = require('../utils/auth');
const PDFDocument = require('pdfkit');
const {
	User,
	Executor,
	Beneficiary,
	Asset,
	AssetApportion,
    Witness,
} = require('../../models');

const executorTemplate = require('../../utils/willGenerator/executorTemplate');

router.get('/:id', withAuth, async (req, res) => {
	// res.header('Content-Disposition', 'attachment; filename=output.pdf');
	if (res.session.id)
	const userData = await User.findOne({
		where: {
			id: req.params.id,
		},
	});

	const date = new Date();

	var currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

	var fullName = () => {
		if (!userData.getDataValue('middle_name')) {
			return `${userData.getDataValue('first_name')} ${userData.getDataValue(
				'last_name'
			)}`;
		} else {
			return `${userData.getDataValue('first_name')} ${userData.getDataValue(
				'middle_name'
			)} ${userData.getDataValue('last_name')}`;
		}
	};
	var occupation = userData.getDataValue('occupation');

	var address = userData.getDataValue('address');

	const executorData = await Executor.findAll({
		where: {
			user_id: req.params.id,
		},
	});

	const executors = executorData.map((results) => results.dataValues);

	const executorTemplate = () => {
        const executorArray = [];
        let executorNumber = 1
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
                executorNumber ++
            }
		}
		let executorString = executorArray.join('');
		return executorString;
    };
    
    const altExecutorTemplate = () => {
        const executorArray = [];
        let executorNumber = 1
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
                executorNumber ++;
            }
		}
		let altExecutorString = executorArray.join('');
		return altExecutorString;
	};

	const beneficiaryData = await Beneficiary.findAll({
		where: {
			user_id: req.params.id,
		},
	});

	const beneficiaries = beneficiaryData.map((results) => results.dataValues);

	console.log(beneficiaries);

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

const witnessData = await Witness.findAll({
    where: {
        user_id: req.params.id,
    },
});

const witnesses = witnessData.map((results) => results.dataValues);

	console.log(witnesses);

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

const doc = new PDFDocument();

doc.pipe(res);

doc.text(
	`Last Will and Testament

    This will dated ${currentDate} is made by me, ${fullName()}, ${occupation}, of ${address}.
    
    Executors

    The following executors will be responsible for the distribution of my assets as directed by this will.
    
    ${executorTemplate()}
    Alternate executors

    If the above executors are unavailable, the following alternate executors will take their place.
    
    ${altExecutorTemplate()}
    Non-monetary gifts
    
    My non-monetary and non-sentimental possessions will be divided as follows:
    
    gifts}
    
    Monetary gifts
    
    My financial assets will be divided as follows:
    
    {financialAssets}
    
    With the rest of my finances, I pledge to the following charities:
    
    {charityDonations}
    
    List of Beneficiaries

    The following list contians all people who are beneficiaries to my estate:
    
    ${beneficiaryTemplate()}
    
    Witnesses
    
    The following people have witnessed my signature and initial on each page of this will:
    
    ${witnessTemplate()}
    
    Declaration
    
    I, ${fullName()}, declare the above and all included in this document to be my last will and testament.
    
    
    ___________________________
    Signature


    ___________________________
    Date signed
    `
);

	doc.end();
	// stream.on('finish', function () {
	// 	// get a blob you can do whatever you like with
	// 	const blob = stream.toBlob('application/pdf');

	// 	// or get a blob URL for display in the browser
	// 	const url = stream.toBlobURL('application/pdf');
	// 	iframe.src = url;
	// });
	console.log('done');
	// };

	// document.getElementById('btn').onclick = writePDF();
});

module.exports = router;
