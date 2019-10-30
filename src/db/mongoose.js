'use strict';

const mongoose = require('mongoose');
const dbName = 'task-manager-api';

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
    useNewUrlParser: true,
    useCreateIndex: true //autocreate indexes when working with mongoDB
});