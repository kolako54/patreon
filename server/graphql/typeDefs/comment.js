const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date
    scalar ObjectID
    extend type Query {
        getComment(id: ID!): AllthatOne
    }
    extend type Mutation {
        createComment(InputComment: InputComment): comment
    }
    type comment {
        id: ID
        post: ObjectID
        user: ObjectID!
        text: String
    }
    input InputComment {
        post: ID!
        user: ID!
        text: String
    }
    type AllthatOne {
        createdAt: Date
        user: User!
        post: ID!
        text: String!
    }
`;
