const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    }
})

module.exports = Question = mongoose.model('Question', questionSchema)