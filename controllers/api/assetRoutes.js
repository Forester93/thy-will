const router = require("express").Router();
const { Asset } = require("../../models");

// Route to Get All
router.get("/", async (req, res) => {
  try {
    const assetData = await Asset.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(assetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Get By ID
router.get("/:id", async (req, res) => {
  try {
    const assetData = await Asset.findByPk(req.params.id);
    if (!assetData) {
      res.status(404).json({ message: "No Asset found with this id!" });
      return;
    }
    res.status(200).json(assetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Create New
router.post("/", async (req, res) => {
  try {
    const assetNew = await Asset.create({
      ...req.body,
      // This get Asset linked with the login account
      user_id: req.session.account_id,
    });
    // console.log(req.session.account_id);
    res.status(200).json(assetNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Update By ID
router.put("/:id", async (req, res) => {
  try {
    const assetData = await Asset.update(req.body, {
      where: {
        id: req.params.id,
      },
      // This get Asset linked with the login account
      user_id: req.session.account_id,
    });
    res.status(200).json(assetData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Delete By ID
router.delete("/:id", async (req, res) => {
  try {
    const assetData = await Asset.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!assetData) {
      res.status(404).json({ message: "No Asset found with this id!" });
      return;
    }
    res.status(200).json(assetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
