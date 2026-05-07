const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const passport = require("passport");
const { saveRedirectUrl } = require("../utils/middleware");
const userController = require("../controllers/users");

router.get("/signup", userController.renderSignForm);

router.post("/signup", wrapAsync(userController.signUp));

router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login,
);

router.get("/logout", userController.logout);

module.exports = router;
