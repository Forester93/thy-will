const router = require("express").Router();
const { User } = require("../models");
const withAuth = require("../utils/auth");

// This is home route, If the user is already logged in, redirect to user's profile page
router.get('/', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('home');
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
    
    res.render("profile", {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
