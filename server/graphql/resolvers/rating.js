const Post = require('../../models/postModel');
const catchAsync = require('../../utilities/catchAsync');

module.exports = {
    Mutation: {
        pressedLike: catchAsync(
            async (_, { user, post }, { RatingModel, PostModel, req }) => {
                console.log("i'm pressedLike");
                const PostLike = await PostModel.findById(post).populate(
                    'usersLikes'
                );
                if (
                    // eslint-disable-next-line no-underscore-dangle
                    PostLike.usersLikes.some((t) => t.user.equals(req.user._id))
                ) {
                    const rateId = await RatingModel.findOne({
                        post,
                        user: req.user._id
                    });
                    if (rateId) {
                        PostLike.usersLikes.pull({ _id: rateId.id });
                        await PostLike.save();
                        await RatingModel.findOneAndDelete({
                            _id: rateId.id,
                        });
                    }
                } else {
                    const CreateLike = await RatingModel.create({
                        user: req.user.id,
                        post,
                    });
                    PostLike.usersLikes.push(CreateLike);
                    await PostLike.save();
                }

                return {
                    status: true,
                    message: 'success!',
                };
            }
        ),
    },
};
