const asyncHandler = require('express-async-handler')


// @desc Get Goals
// @route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req,res) => {

    
    res.status(200).json({
        message: 'Get Goals'
    })
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
    // console.log(req.body)

    res.status(200).json({
        message: 'Set a goal'
    })
})


// @desc Update Goal
// @route PUT /api/goals/:id
// @access private
const updateGoals = asyncHandler(async (req,res) => {
    res.status(200).json({
        message: `Update goal ${req.params.id}`
    })
})


// @desc Delete Goal
// @route Delete /api/goals/:id
// @access private
const deleteGoals = asyncHandler(async (req,res) => {
    res.status(200).json({
        message: `Delete goal ${req.params.id}`
    })
})



// exports 
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}