const express = require('express');
const { createQuestions, getQuestionById, getAllQuestions, deleteQuestion, updateQuestion } = require('../controllers/question');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/').post(protect, restrictTo('ADMIN'), createQuestions)

router.route('/:id').get( getQuestionById);

router.route('/').get(getAllQuestions)

router.route('/:id').patch(protect, restrictTo('ADMIN'), updateQuestion)

router.route('/:id').delete(protect, restrictTo('ADMIN'), deleteQuestion);



module.exports = router ;