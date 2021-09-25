const jwt = require('jsonwebtoken');

// eslint-disable-next-line arrow-body-style
exports.signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
// eslint-disable-next-line arrow-body-style
// exports.refreshToken = (id) => {
//     const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET);
//     process.env.REFRESH_TOKEN.push(refreshToken);
//     return refreshToken;
// };
