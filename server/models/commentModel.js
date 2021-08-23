const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    text: {
        type: String,
        required: [true, 'comment can not be empty.'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'This comment belong to a user'],
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: [true, 'this comment belong to a post'],
    },
});
CommentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name role',
    });
    next();
});
const Comments = mongoose.model('Comment', CommentSchema);
module.exports = Comments;
