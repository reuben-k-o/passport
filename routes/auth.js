const bcrypt = require("bcrypt");
const { Router } = require("express");
const req = require("express/lib/request");
const passport = require("passport");

const router = Router();

const users = [];

router.get("/", checkAuthenticated, (req, res, next) => {
  res.status(200).render("index", { name: req.user.name });
});

router.get("/signup", checkNotAuthenticated, (req, res, next) => {
  res.status(200).render("signup");
});
router.post("/signup", checkNotAuthenticated, async (req, res, next) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 12);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    // console.log(users);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.redirect("/signup");
  }
});

router.get("/login", checkNotAuthenticated, (req, res, next) => {
  res.status(200).render("login");
});
router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = router;
module.exports.users = users;
// exports = users;
