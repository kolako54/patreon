const { defaultFieldResolver } = require('graphql');
const {
    ApolloError,
    SchemaDirectiveVisitor,
} = require('apollo-server-express');

/* eslint-disable */
 class IsAuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {
            const [_, {}, { user, isAuth }] = args;
            if (isAuth) {
                const result = await resolve.apply(this, args);
                return result;
            } else {
                throw new ApolloError(
                    'You must be authenticated first to get this information.',
                    401
                );
            }
        };
    }
}
module.exports = { IsAuthDirective }