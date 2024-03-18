const express = require('express');
const { createOption, deleteOption, addVote } = require('../controllers/option')

const router = express.Router();

router.route('/:id').post(createOption);

router.delete('/:id', deleteOption);
router.get('/:id/add_vote', addVote);


module.exports = router