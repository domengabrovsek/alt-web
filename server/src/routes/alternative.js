'use strict';

const express = require('express');
const router = new express.Router();

const { get, getAll } = require('../utils/utils');
const { insertAlternativeToDb } = require('../utils/db-helpers');
const Alternative = require('../models/alternative');

const Logger = require('../loaders/logger');

// return all records from database
router.get('/alternatives', async (req, res) => {
  try {
    const records = await getAll(Alternative);
    Logger.info(`Processed request.`);
    res.send(records);

  } catch (error) {
    Logger.error(error);
    res.status(500).send();
  }
});

// scrape endpoint
router.get('/alternative', async (req, res) => {

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

      const records = [record];
      const failed = [];
      const succeeded = [];

      Logger.info('Alternatives to process:');
      Logger.info(`${alternatives.map(alt => ` - ${alt}`).join('\n')}`);
      Logger.info('Starting processing: ');

      for (const alt of alternatives) {
        try {
          records.push(await get(alt));
          succeeded.push(alt);
          await insertAlternativeToDb(Alternative, { website_name: query, alternative_name: alt });
          Logger.info(` Processed: ${alt} - DONE`);
        } catch (error) {
          failed.push(alt);
          Logger.error(` Processed: ${alt} - FAILED`);
        }
      }
    }

    Logger.info('Inserting alternatives:');
    Logger.info(`Processed request.`);
    res.send(record);
  } catch (error) {
    if (error.statusCode === 404) {

      const page = error.options.uri.split('/')[error.options.uri.split('/').length - 1];
      const message = `Error: 404 page ${page} not found.`;

      Logger.info(message);
      res.status(400).send({ status: 'error', message });
    } else {
      res.status(500).send();
    }
  }
});

module.exports = router;
