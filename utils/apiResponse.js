class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? 'fail' : 'error';
        this.isOperational = true;
    }
}

const success = (res, data, statusCode = '200', message = 'OK') => res.status(statusCode).json({
    data,
    message
})


export {
    success
}

export default ApiError




