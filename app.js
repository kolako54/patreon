const morgan = require('morgan');
const express = require('express');
const UserRoutes = require('./routes/user-routes');
const globalError = require('./controllers/errorControllers');

const app = express();
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));
app.use('/api/v1/users', UserRoutes);
app.use(globalError);
module.exports = app;
