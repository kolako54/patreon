const { parse, join } = require('path');
const { createWriteStream } = require('fs');
const { ApolloError } = require('apollo-server-express');
const catchAsync = require('../../utilities/catchAsync');

module.exports = {
    // Upload: GraphQLUpload,
    Query: {
        getPost: catchAsync(async (_, { id }, { PostModel }) => {
            console.log("I'm getPost resolver");
            const Post = await PostModel.findById(id).populate('comments');
            if (!Post) {
                return new ApolloError('Oops! post does not exist.', 400);
            }
            return Post;
        }),
    },
    Mutation: {
        singleUpload: catchAsync(async (_, { file, text }, { PostModel }) => {
            console.log("I'm singleUpload resolver");

            const {
                createReadStream,
                filename,
                mimetype,
                encoding,
            } = await file;
            const stream = createReadStream();
            // eslint-disable-next-line prefer-const
            let { ext, name } = parse(filename);
            name = name.replace(/([^a-z0-9 ]+)/gi, '-').replace(' ', '_');
            let serverFile = join(__dirname, `../../uploads/${name}${ext}`);
            const writeStream = await createWriteStream(serverFile);
            await stream.pipe(writeStream);
            serverFile = `${process.env.BASE_URL}${process.env.PORT}${
                serverFile.split('uploads')[1]
            }`;
            const Post = await PostModel.create({
                text: text,
                filelocation: serverFile,
                filename: filename,
            });
            return Post;

            // const out = fs.createWriteStream('local-file-output.txt');
            // stream.pipe(out);
            // console.log(out);
            // await stream.finished(out);

            // return { filename, mimetype, encoding };
        }),
        deletePost: catchAsync(async (_, { id }, { PostModel }) => {
            console.log("I'm deletePost resolver");
            const Post = await PostModel.findByIdAndDelete(id);
            if (!Post) {
                return new ApolloError('Can not find post with that ID', 404);
            }
            return Post;
        }),
        updatePost: catchAsync(async (_, { id, text }, { PostModel }) => {
            console.log("I'm updatePost resolver");
            const Post = await PostModel.findByIdAndUpdate(id, { text });
            if (!Post) {
                return new ApolloError('Post does not find!', 400);
            }
            return Post;
        }),
    },
};
