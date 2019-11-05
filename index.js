'use strict';

// to make it more readable in terminal for test purposes
console.clear();

const express = require('express');
const router = require('./src/routers/router');

// start the connection to the mongodb 
require('./src/db/mongoose'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

// start server
app.listen(port, () => console.log(`Server started on port ${port}`));