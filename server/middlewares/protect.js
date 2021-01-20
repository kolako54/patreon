const jwt = require('jsonwebtoken');
const { UserModel } = require('../models');

const protect = async (req, res, next) => {
    try {
        const getToken = req.get('Authorization');
        let token;
        if (getToken) {
            // eslint-disable-next-line prefer-destructuring
            token = getToken.split(' ')[1];
        }
        if (!token) {
            req.isAuth = false;
            return next();
        }
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
        const User = await UserModel.findById(decodedToken.id);
        if (!User) {
            req.isAuth = false;
            return next();
        }
        // TODO The comment is removed at the end of the project.
        // if (!User.checkPasswordChangeAt(decodedToken.iat)) {
        //     req.isAuth = false;
        // }
        req.isAuth = true;
        req.user = User;
        return next();
    } catch (err) {
        req.isAuth = false;
        return next();
    }
};
module.exports = protect;
