const mongoose = require('mongoose');
const User = require('./usersModel');
const Comment = require('./commentModel');

const PostSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: [true, "You didn't enter anything!"],
        },
        filelocation: String,
        filename: String,
        mimetype: String,
        encoding: String,
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        user: {
            required: [true, 'fuck'],
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
        likeCount: {
            type: Number,
            default: 0,
        },
        usersLikes: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Rate',
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
PostSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'post',
    localField: '_id',
});
PostSchema.pre('save', function(next){
    console.log(this.text);
    next();
})


PostSchema.virtual('numLikes').get(function () {
    if (this.usersLikes) {
        return this.usersLikes.length;
    }
});
PostSchema.virtual('commentNums').get(function () {
    if (this.comments) return this.comments.length;
});

PostSchema.methods.toPull = function (userId) {
    console.log('toPull');
    console.log(userId);
};
PostSchema.statics = {
    incLike(userId) {
        return this.findByIdAndUpdate(
            userId,
            { $inc: { numLikes: 1 } },
            { new: true }
        );
    },
    decLike(userId) {
        return this.findByIdAndUpdate(
            userId,
            { $inc: { numLikes: -1 } },
            { new: true }
        );
    },
};
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
