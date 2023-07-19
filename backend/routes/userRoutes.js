const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')


router.post('/', registerUser)
router.post('/user', loginUser)
router.get('/me', protect, getMe) //protect is auth middleware


module.exports = router

