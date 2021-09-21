const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        get_me: User! @isAuth
        # loginUser(UserLoginInput: UserLoginInput!): AuthUser!
        forgotPassword(email: String!): Notification!
    }
    extend type Mutation {
        signUp(UserInput: UserInput!): AuthUser!
        loginUser(UserLoginInput: UserLoginInput!): AuthUser!
        resetPassword(password: String!, confirmPassword: String!): AuthUser!
        updatePassword(
            currentPassword: String!
            password: String!
            confirmPassword: String!
        ): AuthUser! @isAuth
    }
    input UserInput {
        email: String!
        password: String!
        name: String!
        profile_pic: String
        confirmPassword: String!
        role: role
    }
    input UserLoginInput {
        email: String!
        password: String!
    }

    type User {
        id: ID!
        email: String!
        role: role
        password: String!
        name: String!
        profile_pic: String
        confirmPassword: String!
        comments: [comment]
        posts: [File]
    }
    enum role {
        admin
        user
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
