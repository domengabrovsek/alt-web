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

module.exports = {
    saveToDb
};