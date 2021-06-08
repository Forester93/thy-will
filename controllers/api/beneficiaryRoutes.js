const router = require("express").Router();
const { Beneficiary } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const beneficiaryData = await Beneficiary.findAll({});
    res.status(200).json(beneficiaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Beneficiary.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No Category found with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/create", async (req, res) => {
  // create a new account
  try {
    const accountInfo = await Account.create(req.body);
    let account = accountInfo.get({ plain: true });
    res.status(200).json("Account created!");
    req.session.save(() => {
      req.session.account_id = account.id;
      req.session.logged_in = true;
      res.json({ account: account, message: "You are now logged in!" });
    });
    res.redirect("/");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
