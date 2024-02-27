const User = require('../modals/User');
const jwt = require('jsonwebtoken')

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


module.exports.login = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400).json({
            status: false,
            message: 'Please provide email and password'
        })
    }

    const user = await User.findOne({email, password});

    if(!user) {
        res.status(404).json({
            status: false,
            message: 'User not exist!!'
        })
    }

    const payload = {
        userId: user._id
    }
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRESIN;

    const token = jwt.sign(payload, secret, {expiresIn})

    res.status(200).json({
        status: true,
        token
    })

}
