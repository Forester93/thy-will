const router = require("express").Router();
const { Account, User } = require("../../models");

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
router.get("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/create", async (req, res) => {
  // create a new account
  try {
    const accountInfo = await Account.create(req.body);
    let account = accountInfo.get({ plain: true });
    let newUser = await User.create({
      name: "Your Full Name (including Middle Names)",
      gender: true,
      occupation: "What you do for a living",
      DOB: "Your date of birth",
      casket: "Any casket instructions here",
      ceremony: "Any ceremonial instructions here",
      address: "Your residential address",
      account_id: account.id,
    });
    res.status(200).json("Account created!");
    req.session.save(() => {
      req.session.account_id = account.id;
      req.session.logged_in = true;
      res.json({ account: account, message: "You are now logged in!" });
    });
    res.redirect("/profile");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
