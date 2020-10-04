'use strict';

const express = require('express');
const router = new express.Router();
const Logger = require('../loaders/logger');

const AlternativeService = require('../services/AlternativeService');
const alternativeService = new AlternativeService();

router.get('/alternative', async (req, res) => {

  try {
    const start = process.hrtime();
    Logger.info(`Received request.`);

    const { query, url } = req.query;

    if (!query && !url) {
      res.status(500).send({ status: 'error', message: 'Please enter a query or url!' });
    }

    if (query && url) {
      res.status(500).send({ status: 'error', message: 'Please enter a query or url, not both.' });
    }

    let alternatives;

    if (query) {
      alternatives = await alternativeService.GetAlternativesByQuery(query);
    } else if (url) {
      alternatives = await alternativeService.GetAlternativesByUrl(url);
    }

    const end = process.hrtime(start);
    Logger.info(`Processed request. Took ${end[0]}s, ${end[1] / 1000000} ms`);
    res.send(alternatives);
  } catch (error) {
    Logger.error(error);
    res.status(500).send();
  }
});

router.get('/alternatives', async (req, res) => {
  try {
    Logger.info(`Received request.`);
    const start = process.hrtime();

    const { sync } = req.query;

    // if sync flag is given, first sync all alternatives, then fetch them
    if (sync) {
      const alternativesInDB = await alternativeService.GetAllAlternatives();
      const promises = alternativesInDB
        .map(alt => alternativeService.GetAlternativesByUrl(alt.alt_url));

      try {
        await Promise.all(promises);
      } catch (error) {

        Logger.error(`Error processing ${error.options.uri}`);

        Logger.error(error);
        res.status(500).send();
      }
    }

    const alternatives = await alternativeService.GetAllAlternatives();
    const end = process.hrtime(start);

    Logger.info(`Processed request. Took ${end[0]}s, ${end[1] / 1000000} ms`);
    res.send(alternatives);
  } catch (error) {
    Logger.error(error);
    res.status(500).send();
  }
})

module.exports = router;
