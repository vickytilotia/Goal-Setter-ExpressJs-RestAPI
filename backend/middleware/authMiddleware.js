const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            // Get token from header 
            token = req.headers.authorization.split(' ')[1] //removing word bearer from token

            // Verify token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user id from token
            // select the user but leave the password 
            req.user = await User.findById(decoded.id).select('-password')

            // next run next piece of middleware
            next()
        }
        catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, No token')
    }
})

module.exports = {
    protect
}