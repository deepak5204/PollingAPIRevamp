const express = require('express');
const { createOption } = require('../controllers/option')

const router = express.Router();

router.route('/').post(createOption);

module.exports = router