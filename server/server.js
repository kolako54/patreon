const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { success, error } = require('consola');
const { ApolloServer } = require('apollo-server-express');
const AppModels = require('./models');
const app = require('./app');
const { typeDefs, resolvers } = require('./graphql');
const formatError = require('./utilities/formatError');
const { schemaDirectives } = require('./graphql/directive');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXEPTION: server is shutting down...');
    console.log(err.name, ': ', err.message);
    process.exit(1);
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError,
    schemaDirectives,
    context: ({ req, res }) => {
        // eslint-disable-next-line
        const { isAuth, user, protocol, hostname } = req;
        return {
            isAuth,
            user,
            req,
            protocol,
            hostname,
            res,
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
            ...AppModels,
        };
    },
});

// eslint-disable-next-line
(async function () {
    try {
        await mongoose
            .connect(process.env.DATABASE_LOCAL, {
                useFindAndModify: false,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useNewUrlParser: true,
                autoIndex: true,
            })
            .then(() => {
                success({
                    message: 'You access the db...',
                    badge: true,
                });
            });
        server.applyMiddleware({ app });
        const port = 3000;
        app.listen(port, () => {
            success({
                message: `App is runnig in ${port}...`,
                badge: true,
            });
        });
    } catch (err) {
        error({
            error: err.message,
            badge: true,
        });
    }
})();
