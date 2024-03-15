const Option = require('../modals/Options');

module.exports.createOption = async(req, res) => {
    const questionId = req.params.id;
    const { content } = req.body

    const option = await Option.create({
        content
    })

    res.status(201).json({
        success: true,
        option
    })
}