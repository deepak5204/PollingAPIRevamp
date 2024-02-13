const express = require("express");
const question = require('./question')
const option = require('./option');
const router = express.Router();

router.use("/v2/question", question);
router.use("/v2/option", option);

module.exports = router;
