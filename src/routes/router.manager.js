const express = require("express");
const question = require('./question')
const router = express.Router();

router.use("/v2/question", question);

module.exports = router;
