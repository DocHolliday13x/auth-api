'use strict';

require('dotenv').config();
const { db } = require('./src/api-server/src/models');
const server = require('./src/api-server/src/server.js');
const PORT = process.env.PORT || 3001

db.sync().then(() => {
  server.start(PORT);
});
