const { ApolloError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const encode = (args, secret, options) => jwt.sign(args, secret, options);
const decode = (args, secret) => {
    const decoded = jwt.verify(args, secret);
    if (!decoded) {
        throw new ApolloError('Invalid Token', 401);
    }
    return decoded;
};
const generateAccessToken = (args, res) => {
    const token = encode(args, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.cookie('accessToken', token, {
        httpOnly: true,
        secure: false,
        expiresIn: '15m',
    });
    return token;
};

const generateRefreshCookie = (args, res) => {
    const refreshToken = encode(args, process.env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: '30d',
    });
    const auth = res.cookie('refreshToken', refreshToken, {
        expiresIn: '30d',
        httpOnly: true,
        secure: false,
    });
    return auth;
};
module.exports = {
    encode,
    decode,
    generateAccessToken,
    generateRefreshCookie,
};
