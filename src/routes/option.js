const express = require('express');
const { createOption, deleteOption, addVote } = require('../controllers/option')
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.route('/:id').post(protect, restrictTo('ADMIN'), createOption);

router.route('/:id').delete(protect, restrictTo('ADMIN'), deleteOption);
router.route('/addvote/:id' ).get(protect, addVote);


module.exports = router