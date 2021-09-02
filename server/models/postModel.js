const mongoose = require('mongoose');

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

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
