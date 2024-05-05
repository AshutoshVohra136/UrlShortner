// in this file
//  we will mostly do work user related operations like signup , signin , authentication.

const { userSignup, userLogin } = require("../controller/user");
const express = require("express");

const router = express.Router();

router.post("/", userSignup);
router.post("/login", userLogin);
module.exports = router;
