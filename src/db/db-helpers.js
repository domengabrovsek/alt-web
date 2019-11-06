'use strict';

const Result = require('../models/result');

const saveToDb = async(objects) => {
    for(let object of objects) {
        const result = new Result(object);

        try {
            console.log(`Saving ${object.title}`);
            await result.save();
            saved.push(object.title);
            console.log(`${object.title} saved to database.\n`);
        } catch (error) {
            console.log(error.errmsg);
            console.log(`${object.title} NOT saved to database.\n`);
        }
    }
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
    deleteFromDb
};