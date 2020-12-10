const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: './config.env' });
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Hi',
    });
});
mongoose
    .connect(process.env.DATABASE_LOCAL, {
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        autoIndex: true,
    })
    .then(() => console.log('You access the db...'));
const port = 3000;
const server = app.listen(port, () => {
    console.log(`App is runnig in ${port}...`);
});

process.on('unhandledRejection', (err) => {
    console.log('UNCAUGHT EXEPTION: server is shutting down...');
    console.log(err.name, ': ', err.message);
    server.close(() => process.exit(1));
});
