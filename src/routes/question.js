const express = require('express');
const { createQuestions } = require('../controllers/question');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.route('/').post(protect, createQuestions)

module.exports = router ;