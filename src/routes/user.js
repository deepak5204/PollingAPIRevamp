const express = require('express');
const { signUp, login, protect } = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(protect, login);

module.exports = router;