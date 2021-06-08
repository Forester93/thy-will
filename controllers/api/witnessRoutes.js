const router = require("express").Router();
const { Witness } = require("../../models");
const withAuth = require('../../utils/auth');

// Route to Get All
router.get("/", withAuth, async (req, res) => {
  try {
    
    const witnessData = await Witness.findAll({
      where: {
        //this should be session_id later
        user_id:req.session.account_id,
      },
      order: [['id', 'ASC']] 
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
    // First to get an array of all existing witness name, which is witnessNameArray
    const witnessData = await Witness.findAll({ 
      where: {
        //this should be session_id later
        user_id: req.session.account_id,
      },
      order: [['id', 'ASC']] 
    });
    const witnessObjArray = witnessData.map((witnessObj) => witnessObj.get({ plain: true }));
    const witnessNameArray = witnessObjArray.map((witnessObj) => witnessObj.name);
    // Need a condition checked to stop creating duplicated data
    if( !witnessNameArray.includes(req.body.name) ){
      const witnessNew = await Witness.create(req.body);
      res.status(200).json(witnessNew);
    }
    else {
      res.status(200).json({ message: "Warning, this witness existed for current user" });
      return;
    }
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
        //this should be session_id later
        user_id: req.session.user_id,
      },
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
