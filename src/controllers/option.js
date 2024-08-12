const Option = require("../modals/Options");
const Question = require('../modals/Question');

module.exports.createOption = async (req, res) => {
  try {
    let questionId = req.params.id;
    let question = await Question.findById(questionId);

    if(!question){
      res.status(400).json({
        message: 'Provide a correct question id'
      });
    }

    if (question) {
      let option = await Option.create({
        content: req.body.content,
        votes: req.body.votes,
        question: questionId,
      });
      option.link_vote =
        "http://localhost:5000/v2/option/addvote/" + option.id;
      await option.save();
      question.options.push(option);
      await question.save(); 

      res.status(200).json({
        status: true,
        message: "Option created",
        option,
      });
    } else {
      res.status(404).json({
        status: false,
        message: "Question not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error creating option",
      error: err.message,
    });
  }
};

// Get option
module.exports.getOption = async (req, res) => {
  try {
    let optionId = req.params.id;
    const option = await Option.findById(optionId);

    if (option) {
      res.status(200).json({
        message: 'Success',
        option,
      });
    } else {
      res.status(404).json({
        message: 'Option not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error retrieving option",
      error: err.message,
    });
  }
};

// Update option
module.exports.updateOption = async (req, res) => {
  try {
    let optionId = req.params.id;
    const updateData = req.body;
    const option = await Option.findByIdAndUpdate(optionId, updateData, { new: true });

    if (option) {
      res.status(200).json({
        message: 'Successfully updated',
        option,
      });
    } else {
      res.status(404).json({
        message: 'Option not found',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error updating option",
      error: err.message,
    });
  }
};

// Delete an option on the basis of its id
module.exports.deleteOption = async (req, res) => {
  try {
    let optionId = req.params.id;
    let option = await Option.findById(optionId);

    if (!option) {
      return res.status(404).json({
        status: false,
        message: "Option not found",
      });
    }

    if (option.votes > 0) {
      return res.status(400).json({
        status: false,
        message: "Can't delete! It has votes",
      });
    }

    await Question.findByIdAndUpdate(option.question, {
      $pull: { options: optionId },
    });

    await Option.findByIdAndDelete(optionId);
    res.status(200).json({
      message: "Option deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error deleting option",
      error: err.message,
    });
  }
};

// Adding vote to an option for a particular question
module.exports.addVote = async (req, res) => {
  try {
    let optionId = req.params.id;
    await Option.findByIdAndUpdate(optionId, { $inc: { votes: 1 } });

    res.status(200).json({
      message: "Voted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error adding vote",
      error: err.message,
    });
  }
};


/*

// const Option = require("../modals/Options");
// const Question = require('../modals/Question');

// module.exports.createOption = async (req, res) => {
//   try {
//     let questionId = req.params.id;
//     let question = await Question.findById(questionId);

//     if (question) {
//       let option = await Option.create({
//         content: req.body.content,
//         votes: req.body.votes,
//         question: questionId,
//       });
//       option.link_vote =
//         "http://localhost:5000/v2/option/addvote/" + option.id ;
//       option.save();
//       question.options.push(option);
//       question.save(); 

//       res.status(200).json({
//         status: true,
//         message: "option created",
//         option,
//       });
//     }
//   } catch (err) {
//     console.log("Error : ", err);
//     return;
//   }
// };

// // Get option
// module.exports.getOption = async (req, res) => {
//   let optionId = req.params.id;

//   const option = await Option.findById(optionId);

//   res.status(200).json({
//     message: 'Success',
//     option
//   })
// } 


// //Update Option
// module.exports.updateOption = async (req, res) => {
//   let optionId = req.params.id;
//   const updateData = req.body

//   const option = await Option.findByIdAndUpdate(optionId, updateData, {new: true});

//   res.status(200).json({
//     message: 'Successfully updated',
//     option
//   })
// }

// //delete an option on the basis of its id
// module.exports.deleteOption = async (req, res) => {
//   let optionId = req.params.id;

//   //chek and find option exits or not
//   let option = await Option.findById(optionId);

//   // if option present then check for vote
//   // if option has vote then don't delete
//   if (option.votes > 0) {
//     res.status(404).json({
//       data: {
//         message: "Can't delete! It has vote",
//       },
//     });
//   }

//   // delete option from Question's options array
//   await Question.findByIdAndUpdate(option.question, {
//     $pull: { options: optionId },
//   });

//   // delete option from option
//   await Option.findByIdAndDelete(optionId);
//   res.status(200).json({
//     data: {
//       message: "Option deleted successfully",
//     },
//   });
// };

// //adding vote to an option for particular question
// module.exports.addVote = async (req, res) => {
//   let optionId = req.params.id;
//   //find option if present then vote to it
//   await Option.findByIdAndUpdate(optionId, { $inc: { votes: 1 } });

//   res.status(200).json({
//     data: {
//       message: "Voted Successfully",
//     },
//   });
// };

*/