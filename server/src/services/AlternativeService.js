'use strict';

const ScrapeService = require('./ScrapeService');
const Logger = require('../loaders/logger');
const Alternative = require('../models/alternative-to-process');
const md5 = require('md5');

const scrapeService = new ScrapeService();

module.exports = class AlternativeService {
  async GetAlternativesByQuery(query) {

    Logger.info(`Finding alternatives for: '${query}'`);
    const alternatives = await scrapeService.GetAlternativesByQuery(query);

    Logger.info(`Alternatives found: `);
    alternatives.forEach(alt => Logger.info(` - ${alt.name}`));

    // construct sequelize object to insert to database
    const altSeqObj = alternatives.map((alt, index) => (
      {
        website_name: alt.website,
        alt_name: alt.name,
        alt_url: alt.url,
        web_alt_id: md5(`${query}${alt.name}`),
        weight: alternatives.length - index
      })
    );

    Alternative.bulkCreate(altSeqObj, { updateOnDuplicate: ["web_alt_id"] });

    return alternatives;
  }

  async GetAlternativesByUrl(url) {

    Logger.info(`Finding alternatives for: '${url}'`);
    const alternatives = await scrapeService.GetAlternativesByUrl(url);

    Logger.info(`Alternatives found: `);
    alternatives.forEach(alt => Logger.info(` - ${alt.name}`));

    // construct sequelize object to insert to database
    const altSeqObj = alternatives.map((alt, index) => (
      {
        website_name: alt.website,
        alt_name: alt.name,
        alt_url: alt.url,
        web_alt_id: md5(`${url}${alt.name}`),
        weight: alternatives.length - index
      })
    );

    Alternative.bulkCreate(altSeqObj, { updateOnDuplicate: ["web_alt_id"] });

    return alternatives;
  }

  async GetAllAlternatives() {
    Logger.info(`Fetching all alternatives from database`);

    const alternatives = (await Alternative.findAll()).map(alt => alt.dataValues);
    Logger.info(`Found ${alternatives.length} records.`);

    return alternatives;
  }
}