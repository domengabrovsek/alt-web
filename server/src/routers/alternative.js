'use strict';

const express = require('express');
const cors = require('cors');
const router = new express.Router();

const { get, getAll, remove } = require('../utils');
const { log } = require('../common/common-utils');

const Website = require('../db/models/website');
const Title = require('../db/models/title');

// return all records from database
router.get('/alternatives', cors(), async (req, res) => {
  let results = await getAll(Website);

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

    const alternatives = record.alternatives.split(',');

    let records = [record];

    log(`Alternatives to process: `, 'cyan');
    log(`${alternatives.map(alt => ` - ${alt}`).join('\n')}`, 'yellow');
    log('\n Starting processing: ');

    let failed = [];
    let succeeded = [];

    for (const alt of alternatives) {

      try {
        records.push(await get(alt));
        succeeded.push(alt);
        log(` Processed: ${alt} - DONE`, 'green');
      } catch (error) {
        failed.push(alt);
        log(` Processed: ${alt} - FAILED`, 'red');
      }
    }

    console.log(`Processed request.`);
    res.send(records);
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

router.get('/alternatives/retry', cors(), async (req, res) => {

  const records = await getAll(Title);

  for (const record of records) {

    try {
      await get(record.title);
      // await remove(Title, 'title', record.title);
      // console.log(`Removed '${record.title}' from database`);

    } catch (error) {
      console.log('Error while retrying: ', record.title);
    }

  }

  res.send(records);
});

module.exports = router;
