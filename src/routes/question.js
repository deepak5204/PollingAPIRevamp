const express = require('express');
const { createQuestions } = require('../controllers/question');

const router = express.Router();

router.route('/').post(createQuestions)

module.exports = router ;