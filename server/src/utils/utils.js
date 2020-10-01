'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');

const { parse } = require('../utils/parser');
const { selectFromDb, insertToDb, selectAllFromDb } = require('../utils/db-helpers');
const Website = require('../models/website');

async function getAll(model) {

  const results = await selectAllFromDb(model);

  return results.map(res => {
    delete res.website_id;
    return res;
  });
}

async function get(query) {

  // check if exists in db
  let record = await selectFromDb(Website, 'title', query);

  console.log(record)

  // if exists in database return it otherwise fetch from api
  if (record && record.length > 0) {
    return record[0];
  }

  // fetch record from altweb website
  record = await scrape(query);

  // save it to db
  await insertToDb(Website, record);

  return record;
}

async function scrape(query) {
  const options = {
    uri: `https://www.alternativeto.net/software/${query}`,
    transform(body) {
      return cheerio.load(body);
    }
  };

  const result = await rp(options);
  const parsedResult = parse(result);

  return parsedResult;
}

module.exports = {
  scrape,
  get,
  getAll
};