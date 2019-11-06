'use strict';

const homedir = require('os').homedir();
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const saveToCsv = async({ columns, data, filePath } = {}) => {
    try {

        // if no path is specified save it to desktop
        if(!filePath) {
            filePath = `${path.join(homedir, 'Desktop')}\\similar-websites-${new Date().toString().slice(0, 24).replace(/\s|:/g, '-')}.csv`.toString();
        }

        // set up headers for csv file
        const header = columns.map(column => ({ id: column, title: column }));
        const csvWriter = createCsvWriter({ path: filePath, header });
    
        // write to file
        csvWriter
            .writeRecords(data)
            .then(() => console.log('Data saved to: ', filePath));

    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    saveToCsv
}
