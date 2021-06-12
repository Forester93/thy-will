const router = require("express").Router();
const { Executor } = require("../../models");

// Route to Get All
router.get("/", async (req, res) => {
  try {
    const executorData = await Executor.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).json(executorData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Get By ID
router.get("/:id", async (req, res) => {
  try {
    const executorData = await Executor.findByPk(req.params.id);
    if (!executorData) {
      res.status(404).json({ message: "No Executor found with this id!" });
      return;
    }
    res.status(200).json(executorData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to Create New
router.post("/", async (req, res) => {
  try {
    const executorNew = await Executor.create({
      ...req.body,
      // This get Executor linked with the login account
      user_id: req.session.account_id,
    });
    // console.log(req.session.account_id);
    res.status(200).json(executorNew);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Update By ID
router.put("/:id", async (req, res) => {
  try {
    const executorData = await Executor.update(req.body, {
      where: {
        id: req.params.id,
      },
      // This get Executor linked with the login account
      user_id: req.session.account_id,
    });
    res.status(200).json(executorData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to Delete By ID
router.delete("/:id", async (req, res) => {
  try {
    const executorData = await Executor.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!executorData) {
      res.status(404).json({ message: "No Executor found with this id!" });
      return;
    }
    res.status(200).json(executorData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
