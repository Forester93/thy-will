const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

// route to welcome page
router.get("/", async (req, res) => {
  res.render("home");
});

//route to profile
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    // join other table data here later
    });

    const user = userData.get({ plain: true });
    
    res.render("userpage", {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
