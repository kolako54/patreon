const devError = (err, res) => {
    console.log('asdasdasd');
    res.statusCode(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err,
    });
};

module.exports = (err, req, res, next) => {
    console.log('sddsc');
    // eslint-disable-next-line
    err.statusCode = err.statusCode || 400;
    // eslint-disable-next-line
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'developement') {
        console.log('inside if');
        devError(err, res);
    } else {
        // ...
    }
};
