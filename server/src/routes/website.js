'use strict';

const express = require('express');
const router = new express.Router();

const { getAll } = require('../utils/utils');
const Website = require('../models/website');

const Logger = require('../loaders/logger');

// return all records from database
router.get('/websites', async (req, res) => {
  try {
    const records = await getAll(Website);
    Logger.info(`Processed request.`);
    res.send(records);

  } catch (error) {
    Logger.error(error);
    res.status(500).send();
  }
});

module.exports = router;
