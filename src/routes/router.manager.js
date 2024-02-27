const express = require("express");
const question = require('./question')
const option = require('./option');
const user = require('../routes/user');
const router = express.Router();

router.use("/v2/question", question);
router.use("/v2/option", option);
router.use("/v2/user", user)

module.exports = router;
