'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { parse } = require('../parser');
const { get, update, insert, remove } = require('../db/db-helpers');
const { saveToCsv } = require('../fs/csv-helpers');
const website = require('../db/models/website');
const path = require('path');

// status test endpoint
router.get('/status', async (req, res) => {
  console.log(`\n[GET] - '/status'.`);
  res.send('Server is working!');
});

// data test endpoint
router.get('/test', async (req, res) => {
  console.log(`\n[GET] - '/test'.`);

  let testData = {
    data: []
  };

  for (let i = 0; i < 50; i++) {
    testData.data.push({
      id: i,
      name: `Name ${i}`,
      description: `Description something ${i}`,
      column1: `Column data - ${i}`,
      column2: `Column data - ${i}`,
      column3: `Column data - ${i}`,
      column4: `Column data - ${i}`,
      column5: `Column data - ${i}`,
      column6: `Column data - ${i}`,
      column7: `Column data - ${i}`,
    });
  }

  res.set("Access-Control-Allow-Origin", '*');
  res.send(testData);
});

// delete
router.delete('/delete', async (req, res) => {

  console.log(`\n[DELETE] - 'delete'.`);

  const result = await remove(website);

  res.set("Access-Control-Allow-Origin", '*');
  res.send(`Removed: ${result}`);
})

// get
router.get('/get', async (req, res) => {

  console.log(`\n[GET] - '/get'.`);

  const result = await get(website);

  res.set("Access-Control-Allow-Origin", '*');
  res.send(`Results: ${JSON.stringify(result)}`);
})

// create
router.post('/create', async (req, res) => {

  console.log(`\n[POST] - '/create'.`);

  let record = {
    name: 'test',
    rating: 15
  }

  const result = await insert(website, record);

  res.set("Access-Control-Allow-Origin", '*');
  res.send(`Created website with id: ${result.website_id}`);
})

router.get('/scrape', async (req, res) => {

  console.log(`\nReceived request.`);
  console.log(`URI: ${req.originalUrl}`)
  console.log(`Method: ${req.method}`)

  const query = req.query.searchQuery;

  const options = {
    uri: `https://www.alternativeto.net/software/${query}`,
    transform: function (body) {
      return cheerio.load(body);
    }
  }

  rp(options).then(async ($) => {

    const parsedResult = parse($);

    // test 
    const resultWithAlternatives = parsedResult.alternatives.map(alt => {
      return {
        original: parsedResult.title,
        alternative: alt
      };
    })

    saveToCsv({ 
      columns: Object.keys(resultWithAlternatives[0]), 
      data: resultWithAlternatives,
      filePath: path.join(__dirname, '../../../data/csv-files/')
    })

    console.log({ data: resultWithAlternatives });

    console.log(`Processed request.`);
    res.set("Access-Control-Allow-Origin", '*');
    res.send(resultWithAlternatives);
  }).catch(error => {
    console.log(`Site ${query} doesn't exist!`)
    res.set("Access-Control-Allow-Origin", '*');
    res.send({ status: "error", message: `Site ${query} doesn't exist!`});
  })
})

// save to csv
router.get('/save-to-csv', async (req, res) => {

  try {
    // get all records from db
    const data = await readFromDb();
    const columns = Object.keys(JSON.parse(JSON.stringify(data))[0]);

    await saveToCsv({
      columns,
      data
    });

    res.set("Access-Control-Allow-Origin", '*');
    res.send({
      message: 'Success',
      noOfRecords: data.length
    });

  } catch (error) {
    console.log(error);
    res.set("Access-Control-Allow-Origin", '*');
    res.status(400).send({
      error: 'Something went wrong, try again.'
    });
  }
});

// delete all records from db
router.delete('/websites', async (req, res) => {

  await deleteFromDb();
  res.send();
});

module.exports = router;