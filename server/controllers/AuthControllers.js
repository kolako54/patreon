const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/usersModel');
const AppError = require('../utilities/AppError');
const catchAsync = require('../utilities/catchAsync');
const nodemailer = require('../utilities/nodemailer');
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
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!password || !email) return next(new AppError('لطفا همه ی فیلد ها را پر کنید', 400));
    if (!user || !(await user.correctPassword(password, user.password))) return next(new AppError('پسورد یا یوزر اشتباه است لطفا درستی آن را چک کنید و مجددا امتحان کنید', 401));
    createSendToken(user, 201, res);
});
/* eslint-enable */

// eslint-disable-next-line
exports.forgotPassword = catchAsync(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new AppError('این یوزر وجود ندارد!', 401));
    const dummyToken = user.createDummyToken();
    await user.save({ validateBeforeSave: false });
    try {
        const reset = `${req.protocol}://${req.hostname}/api/v1/users/resetpassword/${dummyToken}`;
        const message = `${reset}پسوردتو تو این سایت فراموش کردی؟ اگه اره روش کلیک کن`;
        const subject = 'فراموشی رمز عبور، فقط ده دقیقه اعتبار دارد';
        await nodemailer({ email: user.email, message, subject });
        res.status(200).json({
            status: 'success',
            message: 'token sended successfully',
        });
    } catch (error) {
        user.hashToken = undefined;
        user.resetTokenExpires = undefined;
        user.save({ validateBeforeSave: false });
        return next(
            new AppError(
                'Oops! seems to be occured some error to send email, please try again later!'
            ),
            501
        );
    }
});
/* eslint-disable */
exports.resetPassword = catchAsync(async (req, res, next) => {
    const getDummyToken = req.params.resetToken;
    console.log('reset token inside authcontroller: ', getDummyToken);
   

   
    const hash = crypto.createHash('sha256').update(getDummyToken).digest('hex');
    console.log('hash token inside authcontroller: ', hash)
    const user = await User.findOne({ hashToken: hash, resetTokenExpires: {$gt: Date.now(), }});

    if(!user) return next(new AppError('This token was not find!', 401));
   

    user.resetTokenExpires = undefined;
    user.hashToken = undefined;
    user.password = req.body.password;
    // user.confirmPassword = req.body.confirmPassword;
    // console.log('user..............',user);
    await user.save();
    console.log('user..............',user);
    createSendToken(user, 200, res);
});
/* eslint-enable */
