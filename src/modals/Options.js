const mongoose = require('mongoose');

const optionsSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    votes: {
        type: Number
    }
})

const Option = mongoose.model('Option', optionsSchema);

module.exports = Option