const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date
    scalar ObjectID
    extend type Query {
        getComment(id: ID!): comment
    }
    extend type Mutation {
        createComment(InputComment: InputComment): comment @isAuth
        # getComment(id: ID!): comment
    }
    type comment {
        id: ID
        post: ID
        user: ObjectID
        text: String
        # replyTo: AllthatOne
        replyTo: ObjectID
        commentNum: Int
    }
    input InputComment {
        replyTo: ObjectID
        post: ID!
        user: ObjectID
        text: String
    }
    type AllthatOne {
        createdAt: Date
        user: User!
        post: ObjectID!
        text: String!
        replyTo: ObjectID
    }
`;
