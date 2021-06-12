const router = require("express").Router();
const PDFDocument = require("pdfkit");
const withAuth = require("../../utils/auth");
const {
  User,
  Executor,
  Beneficiary,
  Asset,
  AssetApportion,
  Witness,
} = require("../../models");

router.get("/", withAuth, async (req, res) => {
  if (req.session.account_id) {
    try {
      const userInfo = await User.findByPk(req.session.account_id, {
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

      //   console.log(user);

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
              `Executor #${executorNumber}\n\n    Name: ${executors[i].name}\n    Relationship: ${executors[i].relationship}\n    Address: ${executors[i].address}\n\n`
            );
            executorNumber++;
          }
          let executorString = executorArray.join("");
          return executorString;
        }
      };

      const altExecutorTemplate = () => {
        const executorArray = [];
        let executorNumber = 1;
        for (i = 0; i < executors.length; i++) {
          if (executors[i].isAlternate) {
            executorArray.push(
              `Alternate Executor #${executorNumber}\n\n    Name: ${executors[i].name}\n    Relationship: ${executors[i].relationship}\n    Address: ${executors[i].address}\n\n`
            );
            executorNumber++;
          }
        }
        let altExecutorString = executorArray.join("");
        return altExecutorString;
      };

      const beneficiaries = user.beneficiaries;

      const beneficiaryTemplate = () => {
        const beneficiaryArray = [];
        for (i = 0; i < beneficiaries.length; i++) {
          if (!beneficiaries[i].isCharity) {
            if (beneficiaries[i].isChild) {
              beneficiaryArray.push(
                `Beneficiary #${i + 1}\n\n    Name: ${
                  beneficiaries[i].name
                }\n    DOB: ${beneficiaries[i].DOB}\n    Relationship: ${
                  beneficiaries[i].relationship
                }\n    Address: ${beneficiaries[i].address}\n    Guardian: ${
                  beneficiaries[i].guardian_name
                }\n    Guardian Address: ${
                  beneficiaries[i].guardian_address
                }\n\n`
              );
            } else {
              beneficiaryArray.push(
                `Beneficiary #${i + 1}\n\n    Name: ${
                  beneficiaries[i].name
                }\n    DOB: ${beneficiaries[i].DOB}\n    Relationship: ${
                  beneficiaries[i].relationship
                }\n    Address: ${beneficiaries[i].address}\n\n`
              );
            }
          } else {
            beneficiaryArray.push(
              `Beneficiary #${i + 1}\n\n    Name: ${
                beneficiaries[i].name
              }\n    Address: ${beneficiaries[i].address}\n\n`
            );
          }
        }
        let beneficiaryString = beneficiaryArray.join("");
        return beneficiaryString;
      };

      const assetsTemplate = () => {
        let assetArray = [];
        for (i = 0; i < assets.length; i++) {
          assetArray.push(
            `Asset #${i + 1}\n\n    Description: ${
              assets[i].description
            }\n    Type: ${assets[i].type}\n    Total value: $${parseFloat(
              assets[i].value
            ).toFixed(2)}\n\n  Apportion instructions:\n\n${apportionTemplate(
              assets[i]
            )}`
          );
        }
        let assetString = assetArray.join("");
        return assetString;
      };

      const apportionTemplate = (assetID) => {
        let apportionArray = [];
        for (x = 0; x < assetApportions.length; x++) {
          if (assetApportions[x].asset_id == assetID.id) {
            const beneficiary = beneficiaries.find(
              (item) => (item.id = assetApportions[x].beneficiary_id)
            );
            apportionArray.push(
              `    Beneficiary: ${beneficiary.name}\n    Instruction: ${
                assetApportions[x].apportion_instructions
              }\n    Apportion value: $${(
                assetID.value * assetApportions[x].percentage
              ).toFixed(2)}\n\n`
            );
          }
        }
        let apportionString = apportionArray.join("");
        return apportionString;
      };

      const witnesses = user.witnesses;

      const witnessTemplate = () => {
        const witnessArray = [];
        for (i = 0; i < witnesses.length; i++) {
          witnessArray.push(
            `Witness #${i + 1}\n\n    Name: ${
              witnesses[i].name
            }\n    Occupation: ${witnesses[i].occupation}\n    Address: ${
              witnesses[i].address
            }\n\n\n    Date signed: ______________\n\n\n\n    _________________________\n    Signature\n\n\n`
          );
        }
        let witnessString = witnessArray.join("");
        return witnessString;
      };

      const assets = user.assets;

      const assetApportions = user.asset_apportions;

      //   console.log(assets);

      //   console.log(assetApportions);

      const doc = new PDFDocument({ font: "Times-Roman" });

      doc.pipe(res);

      doc.polygon([10, 10], [600, 10], [600, 780], [10, 780]).stroke();

      doc.on("pageAdded", () =>
        doc.polygon([10, 10], [600, 10], [600, 780], [10, 780]).stroke()
      );

      doc.on("pageAdded", () =>
        doc.image("./public/assets/images/logo-transparent.png", 495, 675, {
          fit: [100, 100],
          align: "right",
          valign: "bottom",
        })
      );

      doc.fontSize(25).text(`Last Will and Testament\n\n`, {
        align: "center",
        underline: true,
      });

      doc
        .fontSize(13)
        .text(
          `This will dated ${currentDate} is made by me, ${user.name}, ${user.occupation}, of ${user.address}.\n\n`
        );

      doc.fontSize(20).text(`Executors\n\n`, { underline: true });

      doc
        .fontSize(13)
        .text(
          `The following executors will be responsible for the distribution of my assets as directed by this will.\n\n${executorTemplate()}\n`
        );

      doc.fontSize(20).text(`Alternate executors\n\n`, { underline: true });

      doc
        .fontSize(13)
        .text(
          `If the above executor(s) are unavailable, the following alternate executor(s) will take their place.\n\n${altExecutorTemplate()}`
        );

      doc.image("./public/assets/images/logo-transparent.png", 495, 675, {
        fit: [100, 100],
        align: "right",
        valign: "bottom",
      });

      doc
        .addPage()
        .stroke()
        .fontSize(20)
        .text(`List of Beneficiaries\n\n`, { underline: true });

      doc
        .fontSize(13)
        .text(
          `The following list contians all people who are beneficiaries to my estate:\n\n${beneficiaryTemplate()}`
        );

      doc
        .addPage()
        .stroke()
        .fontSize(20)
        .text(`Assets\n\n`, { underline: true });

      doc
        .fontSize(13)
        .text(
          `Below is a list of all my assets included in this will. Any assets not described in this will shall be divided as per the guidance of my executors.\n\n${assetsTemplate()}`
        );

      doc
        .addPage()
        .stroke()
        .fontSize(20)
        .text(`Funneral Ceremony Instructions\n\n`, { underline: true });

      doc
        .fontSize(13)
        .text(
          `I wish to be buried in a casket made of ${user.casket}.\n\nThe details of my funeral ceremony will be decided by my executor(s), and will be based on a ${user.ceremony} style funeral.`
        );

      doc
        .addPage()
        .stroke()
        .fontSize(20)
        .text(`Witnesses\n\n`, { underline: true });

      doc
        .fontSize(13)
        .text(
          `The following people have witnessed my signature and initial on each page of this will:\n\n${witnessTemplate()}`
        );

      doc
        .addPage()
        .stroke()
        .fontSize(20)
        .text(`Declaration\n\n`, { underline: true });

      doc
        .fontSize(13)
        .text(
          `I, ${user.name}, declare the above and all included in this document to be my last will and testament.\n\n\n\n    ___________________________\n    Signature\n\n\n\n    ___________________________\n    Date signed`
        );

      doc.end();

      console.log("done");
    } catch (err) {
      console.log(err);
      res.status(403).json(err);
    }
  } else {
    console.log("redirecting");
    res.redirect("/");
  }
});

module.exports = router;
