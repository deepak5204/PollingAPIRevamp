const Option = require("../modals/Options");
const Question = require('../modals/Question');

// module.exports.createOption = async (req, res) => {
//   const questionId = req.params.id;
//   const { content } = req.body;

//   const option = await Option.create({
//     content,
//   });

//   res.status(201).json({
//     success: true,
//     option,
//   });
// };

module.exports.createOption = async (req, res) => {

  try {
    console.log('you are from create option section:')
    let id = req.params.id;
    let question = await Question.findById(id);

    if (question) {
      let option = await Option.create({
        content: req.body.content,
        votes: req.body.votes,
        question: req.params.id,
      });
      option.link_vote =
        "http://localhost:5000/v2/option/addvote/" + option.id ;
      option.save();
      question.options.push(option);
      question.save(); 

      res.status(200).json({
        option,
        data: {
          message: "option created",
        },
      });
    }
    res.status(200).json({ question });
  } catch (err) {
    console.log("Error : ", err);
    return;
  }
};

//delete an option on the basis of its id
module.exports.deleteOption = async (req, res) => {
  let optionId = req.params.id;

  //chek and find option exits or not
  let option = await Option.findById(optionId);

  // if option present then check for vote
  // if option has vote then don't delete
  if (option.votes > 0) {
    res.status(404).json({
      data: {
        message: "Can't delete! It has vote",
      },
    });
  }

  // delete option from Question's options array
  await Question.findByIdAndUpdate(option.question, {
    $pull: { options: optionId },
  });

  // delete option from option
  await Option.findByIdAndDelete(id);
  res.status(200).json({
    data: {
      message: "Option deleted successfully",
    },
  });
};

//adding vote to an option for particular question
module.exports.addVote = async (req, res) => {
  let optionId = req.params.id;
  

  //find option if present then vote to it
  const option = await Option.findByIdAndUpdate(optionId, { $inc: { votes: 1 } });
  console.log('0000000000000-------------', option)

  res.status(200).json({
    data: {
      message: "Voted Successfully",
    },
  });
};
