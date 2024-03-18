const express = require('express');
const { createQuestions, getQuestionById, getAllQuestions, deleteQuestion } = require('../controllers/question');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/').post(protect, restrictTo('ADMIN'), createQuestions)

router.get('/:id', getQuestionById);

router.get('/', getAllQuestions)

router.delete('/:id', deleteQuestion);



module.exports = router ;