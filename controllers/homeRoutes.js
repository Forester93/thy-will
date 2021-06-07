const router = require("express").Router();
const { Account, User } = require("../models");
const withAuth = require("../utils/auth");

// Starter route,
router.get("/starter", (req, res) => {
  res.render("starter", {
    layout: "main-1",
  });
});

router.get("/starter/asset", (req, res) => {
  res.render("asset", {
    layout: "main-1",
  });
});

// This is home route, If the user is already logged in, redirect to user's profile page
router.get("/", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("home", {
    layout: "main",
  });
});

//route to profile
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const accountData = await Account.findByPk(req.session.account_id, {
      attributes: { exclude: ["password"] },
      // join other table data here later
    });

    const account = accountData.get({ plain: true });

    res.render("profile", {
      layout: "main-1",
      ...account,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
