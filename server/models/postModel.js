const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: ["You didn't enter anything!", true],
        },
        filelocation: String,
        filename: String,
        mimetype: String,
        encoding: String,
        createdAt: {
            type: Date,
            default: Date.now(),
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
