const asyncHandler = require('express-async-handler')
const jwt =  require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../model/userModel')

// @desc Register a new user
// @route POST /api/users
// @access public
const registerUser = asyncHandler(async (req,res) => {
    const {name,email,password} = req.body

    if (!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    // check if user already exists 
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    // Create user 
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('User data invalid')
    }

    
})

// @desc Authenticate a user
// @route POST /api/users/user
// @access public
const loginUser = asyncHandler(async (req,res) => {
    
    const {email, password} = req.body 

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password,user.password))){
        res.status(201).json({
            message:'User LoggedIn',
            _id: user.id,
            name: user.name,
            email: user.email,
            token : generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }
})

// @desc Register a new user
// @route GET /api/users/me
// @access private
const getMe = asyncHandler(async (req,res) => {
    // used authMiddleware for token authentication 
    // jwt token used 
    // the middleware provide user id from token 

    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,

    })

})

// generate a jwt token 
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: '30d', //30 days
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}