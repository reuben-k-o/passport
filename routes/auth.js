const { Router } = require("express");

const router = Router();
router.get("/", (req, res, next) => {
  res.status(200).render("index", { name: "Reuben" });
});

router.get("/signup", (req, res, next) => {
  res.status(200).render("signup");
});
router.post("/signup", (req, res, next) => {});

router.get("/login", (req, res, next) => {
  res.status(200).render("login");
});
router.post("/login", (req, res, next) => {});

module.exports = router;
