const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { success, error } = require("consola")
const { ApolloServer } = require("apollo-server-express")
const cors = require("cors")
const AppModels = require("./models")
const app = require("./app")
const { typeDefs, resolvers } = require("./graphql")
const formatError = require("./utilities/formatError")
const { schemaDirectives } = require("./graphql/directive")

dotenv.config({ path: "./config.env" })

process.on("uncaughtException", err => {
    console.log("UNCAUGHT EXEPTION: server is shutting down...")
    console.log(err.name, ": ", err.message)
    process.exit(1)
})

const server = new ApolloServer({
    cors: false,
    typeDefs,
    resolvers,
    formatError,
    schemaDirectives,
    context: ({ req, res }) => {
        // eslint-disable-next-line
        const { isAuth, user, protocol, hostname } = req
        return {
            isAuth,
            user,
            req,
            protocol,
            hostname,
            res,
            // eslint-disable-next-line node/no-unsupported-features/es-syntax
            ...AppModels,
        }
    },
})

// eslint-disable-next-line
;(async () => {
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
                    message: "You access the db...",
                    badge: true,
                })
            })
        server.applyMiddleware({ app })
        const port = 4000
        app.listen(port, () => {
            success({
                message: `App is runnig in ${port}...`,
                badge: true,
            })
        })
    } catch (err) {
        error({
            error: err.message,
            badge: true,
        })
    }
})()
// app.all(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(cors({ origin: "http://localhost:3000" }))

// app.use(
//     cors({
//         credentials: true,
//         origin: 'http://localhost:3000',
//         allowedHeaders: ['Content-Type', 'Authorization'],
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         // preflightContinue: false,
//         optionsSuccessStatus: 200,
//     })
// );
