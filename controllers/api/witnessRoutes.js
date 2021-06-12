const router = require("express").Router();
const { Witness } = require("../../models");

// Route to Get All
router.get("/", async (req, res) => {
  try {
    const witnessData = await Witness.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(witnessData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Get By ID
router.get("/:id", async (req, res) => {
  try {
    const witnessData = await Witness.findByPk(req.params.id);
    if (!witnessData) {
      res.status(404).json({ message: "No Witness found with this id!" });
      return;
    }
    res.status(200).json(witnessData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Create New
router.post("/", async (req, res) => {
  try {
    const witnessNew = await Witness.create({
      ...req.body,
      // This get witness linked with the login account
      user_id: req.session.account_id,
    });
    // console.log(req.session.account_id);
    res.status(200).json(witnessNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Update By ID
router.put("/:id", async (req, res) => {
  try {
    const witnessData = await Witness.update(req.body, {
      where: {
        id: req.params.id,
      },
      // This get witness linked with the login account
      user_id: req.session.account_id,
    });
    res.status(200).json(witnessData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Delete By ID
router.delete("/:id", async (req, res) => {
  try {
    const witnessData = await Witness.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!witnessData) {
      res.status(404).json({ message: "No Witness found with this id!" });
      return;
    }
    res.status(200).json(witnessData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
