const AppError = require('../utilities/AppError');

const devError = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        err,
    });
};
const ProdError = (err, res) => {
    console.log(res.status);
    res.status(err.statusCode).json({
        status: err.status,
        error: err.message,
    });
};
const handleErrorDuplicate = (error) => {
    const duplicate = error.keyValue.email;
    const message = ` این ایمیل از قبل وجود داره برادر یکی دیگه وارد کن ${duplicate} `;
    return new AppError(message, 400);
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
        // eslint-disable-next-line
        let error = { ...err };
        if (err.code === 11000) error = handleErrorDuplicate(error);
        ProdError(error, res);
    }
};
