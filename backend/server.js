const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

// Init db 
connectDB()

// Init app 
const app = express()

// using middleware
app.use(express.json()) // for json
app.use(express.urlencoded({extended: false})) //for url encoded


// api routes
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


// use custom error handler
app.use(errorHandler)

// server configuration 
app.listen(port, ()=> console.log(`Server started on ${port}`))