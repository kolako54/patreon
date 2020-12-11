const devError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err,
    });
};
// eslint-disable-next-line
module.exports = (err, req, res, next) => {
    // eslint-disable-next-line
    err.statusCode = err.statusCode || 400;
    // eslint-disable-next-line
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        devError(err, res);
    } else {
        // ...
    }
};
