'use strict';

const Logger = require('../loaders/logger');

async function selectAllFromDb(model) {
  return await model.findAll().map(res => res.dataValues);
}

async function selectFromDb(model, column, value) {

  // construct where condition
  const filter = { where: {} };

  if (column && value) {
    filter.where[column] = value;
  }

  try {
    const result = await model.findAll(filter);
    return result.map(website => website.dataValues);
  } catch (error) {
    Logger.error(`Error when selecting ${model.tableName} where ${column} = ${value}: ${error}`);
    return null;
  }
}

// TODO refactor this asap!!!
async function insertAlternativeToDb(model, record) {
  try {

    const result = await model.create(record);
    Logger.info(`Created a new '${model.tableName}': ${result}`);
    return result.dataValues;
  } catch (error) {
    Logger.error(`Error when inserting ${model.tableName}: ${error}`);
    return null;
  }
}

async function insertToDb(model, record) {
  try {

    const mappedRecord = {
      title: record.title,
      website: record.website,
      description: record.description,
      no_of_likes: record.noOfLikes,
      overview: record.overview,
      features: record.features,
      categories: record.categories,
      alternatives: record.alternatives,
      platforms: record.platforms,
      tags: record.tags
    };

    const result = await model.create(mappedRecord);
    Logger.info(`Created a new '${model.tableName}': ${result}`);
    return result.dataValues;
  } catch (error) {
    Logger.error(`Error when inserting ${model.tableName}: ${error}`);
    return null;
  }
}


module.exports = {
  selectFromDb,
  selectAllFromDb,
  insertToDb,
  insertAlternativeToDb
};
