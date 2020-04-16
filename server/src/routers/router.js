'use strict';

const express = require('express');
const router = new express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const { parse } = require('../parser');

// status test endpoint
router.get('/status', async (req, res) => {
  console.log(`\n[GET] - '/status'.`);
  res.send('Server is working!');
});

// scrape endpoint
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

  rp(options)
    .then(async ($) => {

      const parsedResult = parse($);

      console.log('Response: ', parsedResult);

      console.log(`Processed request.`);
      res.set("Access-Control-Allow-Origin", '*');
      res.send(parsedResult);
    }).catch(error => {
      console.log(`Site ${query} doesn't exist!`)
      res.set("Access-Control-Allow-Origin", '*');
      res.send({ status: "error", message: `Site ${query} doesn't exist!` });
    })
})

module.exports = router;
