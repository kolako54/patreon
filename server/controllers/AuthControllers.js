const jwt = require('jsonwebtoken');
const User = require('../models/usersModel');
const AppError = require('../utilities/AppError');
const catchAsync = require('../utilities/catchAsync');
// eslint-disable-next-line
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const createSendToken = (user, statusCode, res) => {
    // eslint-disable-next-line
    const token = signToken(user._id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 1000 * 60 * 60 * 24
        ),
        httpOnly: true,
        // secret: true, just for https.
    };
    res.cookie('jwt', token, cookieOptions);
    // eslint-disable-next-line
    user.password = undefined;
    res.status(statusCode).json({
        status: 'created',
        token,
        user,
    });
};

exports.signUp = catchAsync(async (req, res) => {
    const user = await User.create(req.body);
    createSendToken(user, 201, res);
});

/*eslint-disable */
exports.login = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email }).select('+password');
    if(!password || !email) return next(new AppError('لطفا همه ی فیلد ها را پر کنید',400));
    if(!user || !( await user.correctPassword(password, user.password))) return next(new AppError('پسورد یا یوزر اشتباه است لطفا درستی آن را چک کنید و مجددا امتحان کنید',401));
    createSendToken(user, 201, res);
});
/* eslint-enable */
