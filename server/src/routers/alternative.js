'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const router = new express.Router();

const { readFromFile, saveToFile, exists } = require('../fs/fileHelpers');
const { get, getAll } = require('../common/utils');
const { log } = require('../common/common-utils');
const { insertAlternativeToDb } = require('../db/utils/db-helpers');
const Alternative = require('../db/alternative/model');

// return all records from database
router.get('/alternatives', cors(), async (req, res) => {
  try {
    const records = await getAll(Alternative)
    console.log(`Processed request.`);
    res.send(records);

  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

// scrape endpoint
router.get('/alternative', cors(), async (req, res) => {

  try {
    const query = req.query.searchQuery;

    if (!query) {
      res.status(500).send({ status: 'error', message: 'Please enter a search query!' });
    }

    // get initial record
    const record = await get(query);

    // if a record is found then loop through all of its alternatives and get their alternatives
    if (record) {

      const alternatives = record.alternatives
        .replace(/\s/g, '-')
        .split(',');

      let records = [record];
      let failed = [];
      let succeeded = [];

      log(`Alternatives to process: `, 'cyan');
      log(`${alternatives.map(alt => ` - ${alt}`).join('\n')}`, 'yellow');
      log('\n Starting processing: ');

      for (const alt of alternatives) {
        try {
          records.push(await get(alt));
          succeeded.push(alt);
          await insertAlternativeToDb(Alternative, { website_name: query, alternative_name: alt });
          log(` Processed: ${alt} - DONE`, 'green');
        } catch (error) {
          failed.push(alt);
          log(` Processed: ${alt} - FAILED`, 'red');
        }
      }
    }

    console.log('Inserting alternatives:')


    console.log(`Processed request.`);
    res.send(record);
  } catch (error) {
    if (error.statusCode === 404) {

      const page = error.options.uri.split('/')[error.options.uri.split('/').length - 1];
      const message = `Error: 404 page ${page} not found.`;

      console.log(message);
      res.status(400).send({ status: 'error', message });
    } else {
      res.status(500).send();
    }
  }
});

function addTitle(title) {

  // title dictionary
  const filePath = path.join(__dirname, '../db/titles.json');

  if (!exists(filePath)) {
    saveToFile({ path: filePath, data: {} });
  }

  // read the dictionary
  let dictionary = readFromFile(filePath);

  // if it already exists just return it
  if (Object.keys(dictionary).some(key => key === title)) {
    console.log(`Title ${title} already exists in the dictionary!`);
    return dictionary;
  }

  // add the title and save
  dictionary[title] = title;
  saveToFile({ path: filePath, data: dictionary, overwrite: true });

  console.log(`Title ${title} added!`);

  return dictionary;
}

module.exports = router;
