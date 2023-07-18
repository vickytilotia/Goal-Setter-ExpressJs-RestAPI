// express has by default error handler 
// but it return error in HTML format 
// to convert it into json, fn errorHandler is used
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        // if project is in production then show err.stack else null
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {errorHandler}