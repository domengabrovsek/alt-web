'use strict';

const express = require('express');
const cors = require('cors');
const router = new express.Router();

const { getAll } = require('../common/utils');
const Website = require('../db/website/model');

// return all records from database
router.get('/websites', cors(), async (req, res) => {
  try {
    const records = await getAll(Website)
    console.log(`Processed request.`);
    res.send(records);

  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
