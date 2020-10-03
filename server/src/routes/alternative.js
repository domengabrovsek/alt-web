'use strict';

const express = require('express');
const router = new express.Router();

const { getAll, getAlternatives } = require('../utils/utils');

const md5 = require('md5');
const Logger = require('../loaders/logger');
const Alternative = require('../models/alternative-to-process');

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
router.get('/alternative/fetch', async (req, res) => {

  try {
    const query = req.query.searchQuery;

    if (!query) {
      res.status(500).send({ status: 'error', message: 'Please enter a search query!' });
    }

    // get alternatives for selected query
    Logger.info(`Finding alternatives for: '${query}'`);
    const alternatives = await getAlternatives(query);

    Logger.info(`Alternatives found: `);
    alternatives.forEach(alt => Logger.info(`  ${alt}`));

    // construct sequelize object to insert to database
    const altSeqObj = alternatives.map(alt => (
      {
        website_name: query,
        alternative_name: alt,
        web_alt_id: md5(`${query}${alt}`)
      })
    );

    Alternative.bulkCreate(altSeqObj, { updateOnDuplicate: ["web_alt_id"] });

    Logger.info(`Processed request.`);
    res.send();
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
