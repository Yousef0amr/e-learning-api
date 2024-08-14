const globelError = (err, req, res, next) => {
    err.statusCode = err.statusCode || err.status || 500;
    if (process.env.NODE_ENV === "dev") {
        sendErrorForDev(err, res)
    } else {
        sendErrorForPro(err, res)
    }
}


const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    })
}

const sendErrorForPro = (err, res) => {
    return res.status(err.statusCode).json({
        message: err.message
    })
}


export default globelError