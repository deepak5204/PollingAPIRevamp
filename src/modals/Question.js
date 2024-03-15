const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Option",
        }
    ]
},
{
    timestamps: true,
}
)

module.exports = Question = mongoose.model('Question', questionSchema)