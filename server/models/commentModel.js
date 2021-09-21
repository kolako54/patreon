const mongoose = require('mongoose');
const User = require('./usersModel');
const Post = require('./postModel');

const CommentSchema = mongoose.Schema(
    {
        replyTo: {
            type: mongoose.Schema.ObjectId,
            ref: 'Comment',
        },
        text: {
            type: String,
            required: [true, 'comment can not be empty.'],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        user: {
            ref: 'User',
            type: mongoose.Schema.ObjectId,
            required: [true, 'This comment belong to a user'],
        },
        post: {
            ref: 'Post',
            type: mongoose.Schema.ObjectId,
            required: [true, 'this comment belong to a post'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
// CommentSchema.virtual('repliesTo', {
//     ref: 'User',
//     foreignField: 'replyTo',
//     localField: '_id',
// });
// CommentSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'replyTo',
//         select: 'text',
//     });
//     next();
// });

// CommentSchema.methods.lengthComment = function () {
//     if (!this.commentNum) {
//         this.commentNum = 1;
//     } else {
//         this.commentNum += 1;
//     }
// };
const Comments = mongoose.model('Comment', CommentSchema);

// eslint-disable-next-line

module.exports = Comments;
