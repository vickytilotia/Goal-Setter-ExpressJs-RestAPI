const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')

router.post('/', registerUser)
router.post('/user', loginUser)
router.get('/me', getMe)


module.exports = router

