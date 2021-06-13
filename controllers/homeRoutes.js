const router = require("express").Router();
const {
  Account,
  User,
  Asset,
  AssetApportion,
  Beneficiary,
  Witness,
  Executor,
} = require("../models");
const withAuth = require("../utils/auth");

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
router.get("/home", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("home", {
    layout: "main",
  });
});

router.get("/about", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }
  res.render("team", {
    layout: "main-about",
  });
});

router.get("/login", (req, res) => {
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

    const userInfo = await User.findByPk(req.session.account_id, {
      include: [
        {
          model: Asset,
        },
        {
          model: Beneficiary,
        },
        {
          model: Executor,
        },
        {
          model: Witness,
        },
        {
          model: AssetApportion,
        },
      ],
    });

    const user = userInfo.get({ plain: true });

    const account = accountData.get({ plain: true });
    // console.log(user.beneficiaries);

    res.render("profile", {
      layout: "main-1",
      account,
      user,
      beneficiaries: user.beneficiaries,
      executors: user.executors,
      witnesses: user.witnesses,
      assets: user.assets,
      assetApportions: user.asset_apportions,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
