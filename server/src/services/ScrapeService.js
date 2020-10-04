'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');
const ParseService = require('./ParseService');
const parseService = new ParseService();

module.exports = class ScrapeService {

  async GetAlternativesByQuery(query) {
    const options = {
      uri: `https://www.alternativeto.net/software/${query}`,
      transform(body) {
        return cheerio.load(body);
      }
    };

    const result = await rp(options);
    const alternatives = await parseService.ParseAlternatives(result);

    return alternatives;
  }

  async GetAlternativesByUrl(url) {

    // remove /about at the end of url
    url = url.replace('about', '');

    const options = {
      uri: url,
      transform(body) {
        return cheerio.load(body);
      }
    }

    const result = await rp(options);
    const alternatives = await parseService.ParseAlternatives(result);

    return alternatives;
  }
}
