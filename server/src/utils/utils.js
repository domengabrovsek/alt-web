'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');

const { parse, parseAlternatives } = require('../utils/parser');

async function getAlternatives(query) {
  const options = {
    uri: `https://www.alternativeto.net/software/${query}`,
    transform(body) {
      return cheerio.load(body);
    }
  };

  const result = await rp(options);
  return parseAlternatives(result);
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
  getAlternatives
};
