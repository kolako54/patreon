const morgan = require("morgan")
const cors = require("cors")
const express = require("express")

// const { graphqlUploadExpress } = require('graphql-upload');
const { join } = require("path")
const protect = require("./middlewares/protect")

const app = express()
// app.use((req, res, next) => {
// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// res.setHeader('Access-Control-Allow-Header', '*');
// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
// res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     next();
// });
// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "http://localhost:3000");
//     res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
const corsOptions = {
  credentials: true, // This is important.
  origin: "http://localhost:3000",
}

app.use(cors(corsOptions))

app.use(express.static(join(__dirname, "./uploads")))
// app.use(graphqlUploadExpress());
app.use(protect)

app.use(express.json({ limit: "10kb" }))
app.use(morgan("dev"))
module.exports = app
