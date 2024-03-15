const express = require('express');
const { createOption } = require('../controllers/option')

const router = express.Router();

router.route('/:id').post(createOption);

module.exports = router