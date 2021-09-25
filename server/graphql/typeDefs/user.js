const { gql } = require('apollo-server-express');

module.exports = gql`
    extend type Query {
        get_me: User! @isAuth
        refresh(id: ID!): String!
        # loginUser(UserLoginInput: UserLoginInput!): AuthUser!
    }
    extend type Mutation {
        loginUser(UserLoginInput: UserLoginInput!): AuthUser!
        forgotPassword(email: String!): Notification!
        signUp(UserInput: UserInput!): AuthUser!
        resetPassword(password: String!, confirmPassword: String!): AuthUser!
        updatePassword(
            currentPassword: String!
            password: String!
            confirmPassword: String!
        ): AuthUser! @isAuth
        logout: String!
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
        likedPosts: [File]
        comments: [comment]
        posts: [File]
    }
    enum role {
        admin
        user
    }
    type AuthUser {
        user: User
    }
    type Notification {
        status: Boolean!
        message: String!
    }
`;
