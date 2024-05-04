const express = require("express");

const router = express.Router();
const { generateNewURL, generateAnalytics } = require("../controller/url");
router.post("/", generateNewURL);
router.get("/analytics/:shortId", generateAnalytics);
module.exports = router;
