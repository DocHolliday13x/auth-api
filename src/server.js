'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');

// Esoteric Resources
const notFoundHandler = require('./error-handlers/404.js');
const errorHandler = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');

const authRoutes = require('./auth/routes.js');
const v1Routes = require('./routes/v1.js');

// Prepare the express app
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// App Level MW
app.use(express.json());

app.use(logger);

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);

app.use('*', notFoundHandler);
app.use(errorHandler);

// Exports - exports entire object to root level index.js
module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
