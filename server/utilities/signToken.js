const jwt = require('jsonwebtoken');

// eslint-disable-next-line arrow-body-style
module.exports = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
