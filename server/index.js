'use strict';

const express = require('express');

// connect to db
const db = require('./src/db/utils/connect');

const config = require('./configuration');

// routers
const commonRouter = require('./src/routers/common');
const alternativesRouter = require('./src/routers/alternative');
const websitesRouter = require('./src/routers/website');

const app = express();

// custom middleware to log requests to console for every endpoint
app.use((req, res, next) => {
  console.log('\n-------------------------------------');
  console.log(`\nReceived request.`);
  console.log("\x1b[36m", "URI: ", "\x1b[37m", req.originalUrl)
  console.log("\x1b[36m", "Method: ", "\x1b[37m", req.method)

  next();
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error("URI: ", req.originalUrl);
  console.error("Method: ", req.method);
  console.error("Status Code: ", error.statusCode);
  console.error("Error Message:", error.error.message);

  res.status(500).send();
});

// set json as default
app.use(express.json());

// register routers
app.use(commonRouter);
app.use(alternativesRouter);
app.use(websitesRouter);

// server static files
app.use(express.static('public'));

// start server
app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
