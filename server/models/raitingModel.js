const mongoose = require('mongoose');

/* eslint-disable */

const RateSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post'
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
} // eslint-disable-next-line no-use-before-define);
);





/* eslint-enable */
const Rate = mongoose.model('Rate', RateSchema);
module.exports = Rate;
