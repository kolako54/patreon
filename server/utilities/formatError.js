const { ApolloError } = require('apollo-server-express');

module.exports = (err) => {
    if (err.message.startsWith('E11000')) {
        throw new ApolloError('this email already exist.', 401);
    }
    if (err.message.startsWith('Cast to ObjectId')) {
        const error = [...err.message.matchAll(/"(.+?)"/g)].map(([_, a]) => a);
        throw new ApolloError(
            `Id: ${error[0]} for ${error[2]} does not find!`,
            400
        );
    }
    return err;
};
