const Question = require("../modals/Question");
const Option = require('../modals/Options')

module.exports.createQuestions = async (req, res) => {
  const { question } = req.body;
  const createdQuestion = await Question.create({
    question,
  });

  res.status(201).json({
    status: true,
    message: "Question created successfully",
    createdQuestion,
  });
};

//View question
module.exports.getQuestionById = async (req, res) => {
  let question = await Question.findById(req.params.id).populate("options");
  res.status(200).json({
    message: "Success",
    data: {
      question,
    },
  });
};

// view all question
module.exports.getAllQuestions = async (req, res) => {
  const questions = await Question.find();
  res.status(200).json({
    message: "Success",
    data: {
      questions,
    },
  });
};



//Update Question
module.exports.updateQuestion = async (req, res) => {
  let questionId = req.params.id;
  let updateData = req.body;
  const question = await Question.findByIdAndUpdate(questionId, updateData, {
    new: true
  });

  res.status(200).json({
    message: 'Successfully updated',
    question
  })

}


// Delete question
module.exports.deleteQuestion = async (req, res) => {
    let id = req.params.id;
    let question = await Question.findById(id).populate({
      path: "options",
      select: "votes",
    });

    if(!question){
        res.status(400).json({
            status: false,
            message: 'No question with this array!'
        })
    }
      let options = question.options;

      for (let i = 0; i < options.length; i++) {
        if (options[i].votes > 0) {
          return res.status(404).json({
            data: {
              message: "question option has some votes, Not Possible to delete",
            },
          });
        }
      }

      await Option.deleteMany({ question: id });
      await Question.findByIdAndDelete(id);

      res.status(200).json({
        message: "Question deleted successfully",
      });
};
