const { ApolloError } = require('apollo-server-express');

module.exports = (err) => {
    if (err.message.startsWith('E11000')) {
        throw new ApolloError('this email already exist.', 401);
    }
    return err;
};
