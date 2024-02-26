const Question = require('../modals/Question');

module.exports.createQuestions = async(req, res) => {
    const { question } = req.body
    const createdQuestion = await Question.create({
        question
    });

    res.status(201).json({
        status: true,
        createdQuestion
    })
}
