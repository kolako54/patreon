const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        get_me: User! @isAuth
        loginUser(email: String!, password: String!): AuthUser!
        forgotPassword(email: String!): Notification!
    }
    extend type Mutation {
        signUp(UserInput: UserInput!): AuthUser!
        resetPassword(password: String!, confirmPassword: String!): AuthUser!
    }
    input UserInput {
        email: String!
        password: String!
        name: String!
        profile_pic: String
        confirmPassword: String!
    }
    type User {
        id: ID!
        email: String!
        password: String!
        name: String!
        profile_pic: String
        confirmPassword: String!
    }
    type AuthUser {
        user: User!
        token: String!
    }
    type Notification {
        status: Boolean!
        message: String!
    }
`;
