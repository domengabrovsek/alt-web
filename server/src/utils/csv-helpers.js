'use strict';

const homedir = require('os').homedir();
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const { Parser } = require('json2csv');
const Logger = require('../loaders/logger');

const mapToCsv = (data) => {

  // prepare csv headers
  const opts = { fields: Object.keys(data[0]) };

  // parse data to csv form and return it
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    return csv;
  } catch (err) {
    Logger.error(err);
  }
};

const saveToCsv = async ({
  columns,
  data,
  filePath,
  fileName
} = {}) => {
  try {
    // if no path is specified save it to desktop
    if (!filePath) {
      filePath = `${path.join(homedir, 'Desktop')}`.toString();
    }

    if (!fileName) {
      fileName = `similar-websites-${new Date().toString().slice(0, 24).replace(/\s|:/g, '-')}`;
    }

    const fullFileName = `${filePath}/${fileName}.csv`;

    // set up headers for csv file
    const header = columns.map(column => ({
      id: column,
      title: column
    }));

    const csvWriter = createCsvWriter({
      path: fullFileName,
      header
    });

    // check if folder doesn't exist yet
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }

    // write to file
    csvWriter
      .writeRecords(data)
      .then(() => Logger.info('Data saved to: ', fullFileName))
      .catch((error) => {

        if (error.errno === -4058) {
          return Logger.error(`Error: Path ${error.path} doesn't exist.`);
        }

        Logger.error(error);
      });

  } catch (error) {
    Logger.error(error);
  }
};

module.exports = {
  saveToCsv,
  mapToCsv
};
