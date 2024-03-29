const { gql } = require('apollo-server-express');

const Post = gql`
    # scalar Update
    extend type Query {
        otherFields: Boolean!
        getPost(id: ID!, showComments: Boolean): File!
    }
    extend type Mutation {
        singleUpload(file: Upload, text: String!): File! @isAuth
        deletePost(id: ID!): File @isAuth
        updatePost(id: ID!, text: String, likes: ObjectID): File @isAuth
    }
    type File {
        createdAt: Date
        id: ID!
        text: String
        filename: String
        filelocation: String
        comments: [comment]
        user: ObjectID
        post: ObjectID
        # likeNum: Int
        # isLiked: Boolean
        length: Int
        numLikes: Int
        likes: ObjectID
        usersLikes: [ObjectID]
    }
`;

module.exports = Post;
