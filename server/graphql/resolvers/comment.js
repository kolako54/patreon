const catchAsync = require('../../utilities/catchAsync');

module.exports = {
    Query: {
        getComment: catchAsync(async (parent, { id }, { CommentModel }) => {
            console.log("i'm getComment resolver");
            const Comments = await CommentModel.findById(id);
            return Comments;
        }),
    },
    Mutation: {
        createComment: catchAsync(
            async (
                _,
                { InputComment: { post, user, text } },
                { CommentModel }
            ) => {
                console.log("i'm createComment resolver");
                const Comment = await CommentModel.create({
                    post,
                    user,
                    text,
                });
                return Comment;
            }
        ),
    },
};
