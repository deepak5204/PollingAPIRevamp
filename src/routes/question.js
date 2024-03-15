const express = require('express');
const { createQuestions } = require('../controllers/question');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/').post(protect, restrictTo('ADMIN'), createQuestions)

module.exports = router ;