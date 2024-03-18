const express = require('express');
const { createOption, optionDelete, addVote } = require('../controllers/option')

const router = express.Router();

router.route('/:id').post(createOption);

router.delete('/:id/delete', optionDelete);
router.get('/:id/add_vote', addVote);


module.exports = router