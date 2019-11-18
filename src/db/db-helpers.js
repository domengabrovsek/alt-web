'use strict';

const Result = require('../models/result');

const readFromDb = async({ key, value } = {}) => {
    try {
        let filter = {};

        if(key, value) {
            filter[key] = value;
        }

        const results = await Result.find(filter);

        return results;

    } catch (error) {
        console.log('Error when reading from database!');
    }
};

const saveToDb = async(objects) => {

    const dbObjects = objects.map(object => new Result(object));

    // bulk insert
    await Result.insertMany(dbObjects).then(response => {
        const savedObjects = response.map(object => object.title);

        console.log(`Objects saved to database: \n`);
        console.log(savedObjects);

        return response.map(x => x.title);
    }).catch(error => {
        console.log(error);
    })
};

const deleteFromDb = async(key, value) => {
    try {
        let filter = {};

        if(key && value) {
            filter[key] = value;
        }
        
        await Result.deleteMany(filter);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    saveToDb,
    deleteFromDb,
    readFromDb
};