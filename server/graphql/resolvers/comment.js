const catchAsync = require('../../utilities/catchAsync');

module.exports = {
    Query: {
        getComment: catchAsync(async (parent, { id }, { CommentModel }) => {
            console.log("i'm getComment resolver");
            const Comments = await CommentModel.findById(id);
            console.log(Comments);
            return Comments;
        }),
    },
    Mutation: {
        createComment: catchAsync(
            async (
                _,
                { InputComment: { post, text, replyTo } },
                { CommentModel, req }
            ) => {
                const { _id } = req.user;
                console.log("i'm createComment resolver");
                // console.log(replyTo);
                // const cc = await CommentModel.findByIdAndUpdate(
                //     { _id: req.user.id },
                //     {
                //         $inc: { commentNum: 1 },
                //     }
                // );
                // console.log(cc);
                const Comment = await CommentModel.create({
                    replyTo,
                    post,
                    user: req.user.id,
                    text,
                });
                console.log(Comment);
                // await Comment.lengthComment();
                // CommentModel.save({ validateBeforeSave: false });
                console.log('finish');
                return Comment;
            }
        ),
    },
};
