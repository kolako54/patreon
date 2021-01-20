const { AuthenticationError, ApolloError } = require('apollo-server-express');
const crypto = require('crypto');
const catchAsync = require('../../utilities/catchAsync');
const signToken = require('../../utilities/signToken');
const nodemailer = require('../../utilities/nodemailer');

const createSendToken = (user, res) => {
    // eslint-disable-next-line no-underscore-dangle
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        // secure: true, // This just work on https connections, NOT HTTP!
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = false;
    res.cookie('jwt', token, cookieOptions);

    // eslint-disable-next-line no-param-reassign
    user.password = undefined;
    return {
        user,
        token,
    };
};

module.exports = {
    Query: {
        loginUser: catchAsync(
            async (_, { email, password }, { UserModel, res }) => {
                const User = await UserModel.findOne({ email }).select(
                    '+password'
                );
                // eslint-disable-next-line prettier/prettier
            if (!User || !await User.correctPassword(password, User.password)) {
                    throw new AuthenticationError(
                        'ایمیل و یا پسورد اشتباه وارد شده است'
                    );
                }
                return createSendToken(User, res);
            }
        ),
        // eslint-disable-next-line no-empty-pattern
        get_me: (_, {}, { user }) => user,
        forgotPassword: catchAsync(
            async (_, { email }, { UserModel, protocol, hostname }) => {
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
    },
    Mutation: {
        signUp: catchAsync(async (_, { UserInput }, { UserModel, res }) => {
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
            const User = await UserModel.create({ ...UserInput });
            return createSendToken(User, res);
        }),
        resetPassword: catchAsync(
            async (
                _,
                { password, confirmPassword },
                { UserModel, req, res }
            ) => {
                const getDummyToken = req.get('Authorization');
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
                return createSendToken(user, res);
            }
        ),
    },
};
