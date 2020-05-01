'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');

const { parse } = require('./parser');
const { selectFromDb, insertToDb, selectAllFromDb, removeFromDb } = require('./db/db-helpers');

const Website = require('./db/models/website');
const Title = require('./db/models/title');

async function getAll(model) {
  return await selectAllFromDb(model);
};

async function remove(model, column, value) {
  await removeFromDb(model, column, value);
}

async function get(query) {

  // check if exists in db
  let record = await selectFromDb(Website, 'title', query);

  // if exists in database return it otherwise fetch from api
  if (record && record.length > 0) {
    return record[0];
  }

  try {
    // fetch record from alt-web website
    record = await scrape(query);

    if (!record) {
      throw new Error('Error while getting website from alt-web!');
    }

  } catch (error) {
    return console.log('Failed to get record from alt-web: ', query);
  }

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
  }

  try {
    const result = await rp(options);
    const parsedResult = parse(result);

    if (!parsedResult) {
      throw new Error(`Error while parsing data for ${query}`);
    }

    return parsedResult;
  } catch (error) {

    if (error.statusCode === 404) {
      await insertToDb(Title, { title: query });
      return console.log(`Error while fetching data. Site with name ${query} doesn't exist!`);
    }

    console.log(`Error while parsing data for ${query}`);
  }
}

module.exports = {
  scrape,
  get,
  getAll,
  remove
};
