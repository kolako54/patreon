const { AuthenticationError, ApolloError } = require('apollo-server-express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const catchAsync = require('../../utilities/catchAsync');
const { signToken, refreshToken } = require('../../utilities/signToken');
const auth = require('../../utilities/auth');
const nodemailer = require('../../utilities/nodemailer');

// const createSendToken = (user, res) => {
//     // eslint-disable-next-line no-underscore-dangle
//     const token = signToken(user.id); // jwt payload
//     // const refresh_token = refreshToken(user.id);
//     const cookieOptions = {
//         expires: new Date(Date.now() + 30 * 60 * 1000),
//         // secure: true, // This just work on https connections, NOT HTTP!
//         // httpOnly: true,
//         secure: false,
//     };

//     if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
//     res.cookie('jwt-payload-content', user.id, cookieOptions);
//     res.cookie('accessToken', token, { httpOnly: true });

//     // eslint-disable-next-line no-param-reassign
//     user.password = undefined;
//     return {
//         user,
//         token,
//     };
// };

module.exports = {
    Query: {
        // eslint-disable-next-line no-empty-pattern
        get_me: catchAsync(async (_, __, { UserModel, req }) => {
            console.log('im get me');
            console.log(req.get('authorization'));
            const User = await UserModel.findById(req.user._id)
                .populate('comments')
                .populate('posts')
                .populate('likedPosts');
            return User;
        }),
        refresh: catchAsync(async (_, { id }, { UserModel, req, res }) => {
            console.log("I'm refresh token");
            console.log(req.headers);
            // const currentRefreshToken = req.headers['set-cookie'][0]
            //     .split('=')[1]
            //     .split(';')[0];
            const currentRefreshToken = req.headers.refreshtoken;
            console.log('finish');
            const User = await UserModel.findById(id);
            if (!currentRefreshToken) {
                throw new ApolloError('No Refresh Token found', 400);
            }
            console.log('currentRefreshToken', currentRefreshToken);
            const decoded = await jwt.verify(
                currentRefreshToken,
                process.env.JWT_REFRESH_TOKEN_SECRET
            );
            console.log('decoded', decoded);
            // const devices = auth.decode(decoded.address, secret.userSecret);
            await auth.generateRefreshCookie({ id: User.id }, res);
            await auth.generateAccessToken({ id: decoded.id }, res);
            res.cookie('isAuth', true, { secure: false, httpOnly: false });
            return 'refreshed!';
        }),
    },
    Mutation: {
        loginUser: catchAsync(
            async (_, { UserLoginInput }, { UserModel, res }) => {
                console.log("I'm loginUser resolver");
                const { email, password } = UserLoginInput;
                if (!email || !password) {
                    throw new ApolloError(
                        "You didn't enter password or email",
                        400
                    );
                }
                const User = await UserModel.findOne({
                    email,
                }).select('+password');
                // eslint-disable-next-line prettier/prettier
                if (!User || !await User.correctPassword(password, User.password)) {
                    throw new AuthenticationError(
                        'ایمیل و یا پسورد اشتباه وارد شده است'
                    );
                }
                auth.generateRefreshCookie({ id: User.id }, res);
                auth.generateAccessToken({ id: User.id }, res);
                res.cookie('isAuth', true, { httpOnly: false, secure: false });
                console.log(User);
                return { user: User };
                // return createSendToken(User, res);
            }
        ),
        signUp: catchAsync(async (_, { UserInput }, { UserModel, res }) => {
            console.log("I'm signUp resolver");
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
            const User = await UserModel.create({ ...UserInput });
            // return createSendToken(User, res);
            auth.generateRefreshCookie({ id: User.id }, res);
            auth.generateAccessToken({ id: User.id }, res);
            res.cookie('isAuth', true, { httpOnly: false, secure: false });
            return { user: User };
        }),
        resetPassword: catchAsync(
            async (
                _,
                { password, confirmPassword },
                { UserModel, req, res }
            ) => {
                console.log("I'm resetPassword resolver");
                const getDummyToken = req.get('authorization');
                const hash = crypto
                    .createHash('sha256')
                    .update(getDummyToken)
                    .digest('hex');
                const user = await UserModel.findOne({
                    hashToken: hash,
                    resetTokenExpires: { $gt: Date.now() },
                });
                if (!user) throw new ApolloError('این تاکن پیدا نشد', 401);
                user.resetTokenExpires = undefined;
                user.hashToken = undefined;
                user.password = password;
                user.confirmPassword = confirmPassword;
                await user.save();
                auth.generateRefreshCookie({ id: user.id }, res);
                auth.generateAccessToken({ id: user.id }, res);
                res.cookie('isAuth', true, { httpOnly: false, secure: false });
                return { user };
                // return createSendToken(user, res);
            }
        ),
        // eslint-disable-next-line consistent-return
        updatePassword: catchAsync(async (_, ins, { UserModel, req, res }) => {
            console.log("i'm updatePassword");
            const { currentPassword, password, confirmPassword } = ins;
            //! 1) Get user from collection.
            const user = await UserModel.findById(req.user.id).select(
                '+password'
            );
            //! 2) Check if POSTed current password is correct.
            if (!(await user.correctPassword(currentPassword, user.password))) {
                throw new ApolloError(
                    'Password entered was incorrect, please try again!',
                    400
                );
            }
            //! 3) If so, update password.
            user.password = password;
            user.confirmPassword = confirmPassword;
            await user.save();

            //! 4) Log the user in, send JWT.
            // return createSendToken(user, res);
            await auth.generateRefreshCookie({ id: user.id }, res);
            await auth.generateAccessToken({ id: user.id }, res);
            res.cookie('isAuth', true, { httpOnly: false, secure: false });
            return { user };
        }),
        forgotPassword: catchAsync(
            async (_, { email }, { UserModel, protocol, hostname }) => {
                console.log("I'm forgotPassword resolver");
                const user = await UserModel.findOne({ email });
                if (!user) throw new AuthenticationError('این یوزر وجود ندارد');
                const dummyToken = user.createDummyToken();
                await user.save({ validateBeforeSave: false });
                try {
                    const reset = `${protocol}://${hostname}/api/v1/users/resetpassword/${dummyToken}`;
                    const message = `${reset}پسوردتو تو این سایت فراموش کردی؟ اگه اره روش کلیک کن`;
                    // eslint-disable-next-line
                    const subject = 'فراموشی رمز عبور، فقط ده دقیقه اعتبار دارد';
                    await nodemailer({ email: user.email, message, subject });
                    return {
                        status: true,
                        message:
                            'لطفا بر روی لینکی که به ایمیلتون فرستاده شد کلیک کنید',
                    };
                } catch (error) {
                    user.hashToken = undefined;
                    user.resetTokenExpires = undefined;
                    user.save({ validateBeforeSave: false });
                    return {
                        status: false,
                        message: 'ایمیل به دلیل مشکلاتی فرستاده نشد',
                    };
                }
            }
        ),
        logout: catchAsync(async (_, __, { res }) => {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.clearCookie('isAuth');
            return 'You successfully logout :(\nPlease comeback again!';
        }),
    },
};
