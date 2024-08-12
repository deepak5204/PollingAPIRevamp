const Question = require("../modals/Question");
const Option = require('../modals/Options');

module.exports.createQuestions = async (req, res) => {
  try {
    const { question } = req.body;
    const createdQuestion = await Question.create({ question });

    res.status(201).json({
      status: true,
      message: "Question created successfully",
      createdQuestion,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error creating question",
      error: error.message,
    });
  }
};

// View question
module.exports.getQuestionById = async (req, res) => {
  try {
    let question = await Question.findById(req.params.id).populate("options");
    if(!question){
      res.status(400).json({
        message: 'Question not exitst!'
      })
    }
    res.status(200).json({
      message: "Success",
      data: { question },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error retrieving question",
      error: error.message,
    });
  }
};

// View all questions
module.exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      message: "Success",
      data: { questions },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error retrieving questions",
      error: error.message,
    });
  }
};

// Update question
module.exports.updateQuestion = async (req, res) => {
  try {
    let questionId = req.params.id;
    let updateData = req.body;
    const question = await Question.findByIdAndUpdate(questionId, updateData, {
      new: true,
    });

    if(!question) {
      return res.status(400).json({
        status: false,
        message: "No question with this id!",
      });
    }

    res.status(200).json({
      message: "Successfully updated",
      question,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error updating question",
      error: error.message,
    });
  }
};

// Delete question
module.exports.deleteQuestion = async (req, res) => {
  try {
    let id = req.params.id;
    let question = await Question.findById(id).populate({
      path: "options",
      select: "votes",
    });

    if (!question) {
      return res.status(400).json({
        status: false,
        message: "No question with this id!",
      });
    }

    let options = question.options;

    for (let i = 0; i < options.length; i++) {
      if (options[i].votes > 0) {
        return res.status(404).json({
          data: {
            message: "Question option has some votes, Not possible to delete",
          },
        });
      }
    }

    await Option.deleteMany({ question: id });
    await Question.findByIdAndDelete(id);

    res.status(200).json({
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error deleting question",
      error: error.message,
    });
  }
};

