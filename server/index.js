'use strict';

// to make it more readable in terminal for test purposes
console.clear();

const express = require('express');
const router = require('./src/routers/router');

const app = express();
const port = 3000;

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

app.use(express.json());
app.use(router);

// start server
app.listen(port, () => console.log(`Server started on port ${port}`));