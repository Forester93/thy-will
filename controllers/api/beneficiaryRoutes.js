const router = require("express").Router();
const { Beneficiary } = require("../../models");

// Route to Get All
router.get("/", async (req, res) => {
  try {
    const beneficiaryData = await Beneficiary.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(beneficiaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Get By ID
router.get("/:id", async (req, res) => {
  try {
    const beneficiaryData = await Beneficiary.findByPk(req.params.id);
    if (!beneficiaryData) {
      res.status(404).json({ message: "No Beneficiary found with this id!" });
      return;
    }
    res.status(200).json(beneficiaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Create New
router.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const beneficiaryNew = await Beneficiary.create({
      ...req.body,
      // This get Beneficiary linked with the login account
      user_id: req.session.account_id,
    });
    // console.log(req.session.account_id);
    res.status(200).json(beneficiaryNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Update By ID
router.put("/:id", async (req, res) => {
  try {
    const beneficiaryData = await Beneficiary.update(req.body, {
      where: {
        id: req.params.id,
      },
      // This get Beneficiary linked with the login account
      user_id: req.session.account_id,
    });
    res.status(200).json(beneficiaryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Delete By ID
router.delete("/:id", async (req, res) => {
  try {
    const beneficiaryData = await Beneficiary.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!beneficiaryData) {
      res.status(404).json({ message: "No Beneficiary found with this id!" });
      return;
    }
    res.status(200).json(beneficiaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
