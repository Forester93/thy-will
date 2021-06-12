const router = require("express").Router();
const { AssetApportion } = require("../../models");

// Route to Get All
router.get("/", async (req, res) => {
  try {
    const assetApportionData = await AssetApportion.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(assetApportionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Get By ID
router.get("/:id", async (req, res) => {
  try {
    const assetApportionData = await AssetApportion.findByPk(req.params.id);
    if (!assetApportionData) {
      res.status(404).json({ message: "No Asset found with this id!" });
      return;
    }
    res.status(200).json(assetApportionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Create New
router.post("/", async (req, res) => {
  try {
    const assetApportionNew = await AssetApportion.create({
      ...req.body,
      // This get Asset linked with the login account
      user_id: req.session.account_id,
    });

    console.log(req.body);
    // console.log(req.session.account_id);
    res.status(200).json(assetApportionNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

// // Route to Update By ID
// router.put("/:id", async (req, res) => {
//   try {
//     const assetData = await Asset.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//       // This get Asset linked with the login account
//       user_id: req.session.account_id,
//     });
//     res.status(200).json(assetData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Route to Delete By ID
router.delete("/:id", async (req, res) => {
  try {
    const assetApportionData = await AssetApportion.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!assetApportionData) {
      res.status(404).json({ message: "No Asset found with this id!" });
      return;
    }
    res.status(200).json(assetApportionData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
