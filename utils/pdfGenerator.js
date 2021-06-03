const PDFDocument = require('pdfkit');
const fs = require('fs');
const sequelize = require('sequelize');
const blobStream = require('blob-stream');

const date = new Date();

var currentDate = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

var fullName = 'Tom Chappell';

var occupation = 'eCommerce Support Specialist';

var address = '21-23 Grose St, North Parramatta NSW 2151';

// const writePDF = () => {
const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('../public/assets/output.pdf'));

doc.text(
	`Last Will and Testament
    This will dated ${currentDate} is made by me, ${fullName}, ${occupation}, of ${address}.

    Executors
    The following executors will be responsible for the distribution of my assets as directed by this will.

    {executors}

    Alternate executors 100
    If the above executors are unavailable, the following alternate executors will take their place.

    {alternateExecutors}

    Non-monetary gifts
    My non-monetary and non-sentimental possessions will be divided as follows:

    gifts}

    Monetary gifts

    My financial assets will be divided as follows:

    {financialAssets}

    With the rest of my finances, I pledge to the following charities:

    {charityDonations}

    Primary Beneficiary
    The following person is to be the primary beneficiary of my estate

    {primaryBeneficiary}

    Witnesses

    The following people have witnessed my signature and initial on each page of this will:

    {witnesses}

    Declaration

    I, {fullName}, declare the above and all included in this document to be my last will and testament.

    Signed

    {signature}
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
