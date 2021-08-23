const morgan = require('morgan');
const express = require('express');
// const { graphqlUploadExpress } = require('graphql-upload');
const { join } = require('path');
const protect = require('./middlewares/protect');

const app = express();
app.use(express.static(join(__dirname, './uploads')));
// app.use(graphqlUploadExpress());
app.use(protect);

app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));
module.exports = app;
