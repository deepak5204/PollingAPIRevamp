const User = require('../modals/User');

module.exports.signUp = async(req, res) => {
    const {name, email, phoneNo, password} = req.body

    const userData = await User.create({
        name,
        email,
        phoneNo,
        password
    })

    res.status(201).json({
        status: true,
        userData
    })
}


