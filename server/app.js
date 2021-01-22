const morgan = require('morgan');
const express = require('express');
const protect = require('./middlewares/protect');

const app = express();
app.use(protect);
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));
module.exports = app;
