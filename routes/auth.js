const bcrypt = require("bcrypt");
const { Router } = require("express");

const router = Router();

const users = [];

router.get("/", (req, res, next) => {
  res.status(200).render("index", { name: "Reuben" });
});

router.get("/signup", (req, res, next) => {
  res.status(200).render("signup");
});
router.post("/signup", async (req, res, next) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 12);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    });
    console.log(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/login", (req, res, next) => {
  res.status(200).render("login");
});
router.post("/login", (req, res, next) => {});

module.exports = router;
