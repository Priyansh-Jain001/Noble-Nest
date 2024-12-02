const express  = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const passport = require("passport");

const { saveRedirectUrl } = require("../middleware/middleware.js");

const userController = require("../controller/user.js");
const wrapAsync = require("../utilities/wrapAsync.js");

// render signup
router.get("/signup", userController.renderSignup);


router.post("/signotp", wrapAsync(userController.postSignup));

router.get("/otp", userController.getOtp);

router.post("/otp", wrapAsync(userController.postOtp));

// login
router.get("/login", userController.renderLogin);

router.post(
    "/login", 
    saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/home/user/login', failureFlash: true}),  //passport is hepling to login
    wrapAsync(userController.postLogin)
)

router.get("/logout" , userController.logout);

module.exports = router;