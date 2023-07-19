const asyncHandler = require('express-async-handler')

const Goal = require('../model/goalModel')
const User = require('../model/userModel')

// @desc Get Goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find({user: req.user.id})
    
    res.status(200).json(goals)
})

// @desc Set Goal
// @route POST /api/goals
// @access private
const setGoals = asyncHandler(async (req,res) => {

    // error handling
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    
    // saving data into db 
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})


// @desc Update Goal
// @route PUT /api/goals/:id
// @access private
const updateGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    // checking user 
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // matching goal user with loggedIn user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User is not Authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedGoal)
})


// @desc Delete Goal
// @route Delete /api/goals/:id
// @access private
const deleteGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found!')
    }

    // checking user 
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // matching goal user with loggedIn user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User is not Authorized')
    }

    // await goal.deleteMany()
    await Goal.deleteOne({"_id": req.params.id})

    res.status(200).json({id :req.params.id})
})



// exports 
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}