const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

const protect = async (req, res, next) => {
    try {
        console.log('accessToken');
        console.log(req.headers.cookie);
        // console.log(req.headers.cookie.split('refreshToken=')[1]);
        // .join('').split('accessToken=')
        // console.log(req.headers.accesstoken);
        // const tokenString = req.headers.cookie.split(';');
        const d1 = Date.now();
        const cookies = req.headers.cookie
            .split('=')
            .join(' ')
            .split(';')
            .join(' ')
            .split(' ');

        // const tokenString = req.headers.cookie.split(';')[2];
        const accessToken = cookies[cookies.indexOf('accessToken') + 1];
        console.log('accessToken');

        console.log(accessToken);
        // let token;
        // if (accessToken) {
        //     // eslint-disable-next-line prefer-destructuring
        //     token = accessToken.split(' ')[1];
        //     console.log('inside if', token);
        // }
        // console.log('wow',token);
        if (!accessToken) {
            req.isAuth = false;
            return next();
        }
        const decodedToken = await jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );
        // res.cookie('access_token', accessToken, cookieOptions);
        const User = await UserModel.findById(decodedToken.id);
        if (!User) {
            req.isAuth = false;
            return next();
        }
        // TODO The comment is removed at the end of the project.
        // if (!User.checkPasswordChangeAt(decodedToken.iat)) {
        //     req.isAuth = false;
        // }
        // req.decodedToken = decodedToken;
        req.isAuth = true;
        req.user = User;
        return next();
    } catch (err) {
        req.isAuth = false;
        return next();
    }
};
module.exports = protect;
