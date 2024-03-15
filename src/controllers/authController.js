const User = require('../modals/User');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const bcrypt = require('bcryptjs');

module.exports.signUp = async(req, res) => {
    const {name, email, phoneNo, password} = req.body

    const user = await User.findOne({email});
    if(user){
        res.status(400).json({
            status: false,
            message: 'User already exist....!'
        })
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const userData = await User.create({
        name,
        email,
        phoneNo,
        password: hashPassword
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

    
    
    const user = await User.findOne({email});
    const match = await bcrypt.compare(password, user.password);

    if(!match){
        res.status(400).json({
            status: false,
            message: 'Incorrect email or password'
        })  
    }
   
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


module.exports.protect = async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        res.status(401).json({
            status: false,
            message: 'You are not logged in! Please login....'
        })
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const currentUser = await User.findById(decoded.userId);

    if(!currentUser){
        res.status(400).json({
            status: false,
            message: 'The user belonging to this token does no longer exitst'
        })
    }

    req.user = currentUser;
    next();
}
