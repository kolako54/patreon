const { gql } = require('apollo-server-express');

module.exports = gql`
    # extend type Query {
    #     get_me: User! @isAuth
    #     loginUser(UserLoginInput: UserLoginInput!): AuthUser!
    #     forgotPassword(email: String!): Notification!
    # }
    extend type Mutation {
        pressedLike(post: ID!, user: ID): status @isAuth
    }
    type status {
        status: Boolean
        message: String
    }
`;
