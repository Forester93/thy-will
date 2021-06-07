const router = require("express").Router();
const { Account } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const accountData = await Account.findOne({
      where: { email: req.body.email },
    });

    if (!accountData) {
      res.status(400).json({ message: "Login failed. Please try again" });
      return;
    }

    const validPassword = await accountData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Login failed. Please try again" });
      return;
    }

    req.session.save(() => {
      req.session.account_id = accountData.id;
      req.session.logged_in = true;

      res.json({ account: accountData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
