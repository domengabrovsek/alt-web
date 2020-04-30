'use strict';

const path = require('path');
const express = require('express');
const cors = require('cors');
const router = new express.Router();

const { readFromFile, saveToFile, exists } = require('../fs/fileHelpers');
const { get, getAll } = require('../utils');

// return all records from database
router.get('/alternatives', cors(), async (req, res) => {
  let results = await getAll();

  res.send(results);
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

    console.log(`Processed request.`);
    res.send(record);
  } catch (error) {
    if (error.statusCode === 404) {

      const page = error.options.uri.split('/')[error.options.uri.split('/').length - 1];
      const message = `Error: 404 page ${page} not found.`;

      console.log(message);
      res.status(200).send({ status: 'error', message });
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
