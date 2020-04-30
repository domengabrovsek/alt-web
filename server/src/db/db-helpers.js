'use strict';

async function selectAllFromDb(model) {
  return await model.findAll().map(res => res.dataValues);
}

async function selectFromDb(model, column, value) {

  // construct where condition
  let filter = { where: {} };

  if (column && value) {
    filter.where[column] = value;
  }

  try {
    const result = await model.findAll(filter);
    return result.map(website => website.dataValues);
  } catch (error) {
    console.log(`Error when selecting ${model.tableName} where ${column} = ${value}: ${error}`);
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
    console.log(`Created a new '${model.tableName}': ${result}`);
    return result.dataValues;
  } catch (error) {
    console.log(`Error when inserting ${model.tableName}: ${error}`);
    return null;
  }
}

async function update(model, whereColumn, whereValue, updateColumn, updateValue) {
  try {

    // construct where condition
    let update = {};
    update[updateColumn] = updateValue;

    let filter = { where: {} };
    filter.where[whereColumn] = whereValue;

    const result = await model.update(update, filter);
    console.log(`Updated ${model.tableName} where ${whereColumn} = ${whereValue}`);
    return result;
  } catch (error) {
    console.log(`Error when updating ${model.tableName} where ${whereColumn} = ${whereValue}: ${error}`);
    return null;
  }
}

async function remove(model, column, value) {

  // construct where condition
  let filter = { where: {} };
  if (column && value) {
    filter.where[column] = value;
  }

  try {
    console.log(`Attempting to remove: ${model.tableName} where ${column} = ${value}`);
    const result = await model.destroy(filter);
    console.log(`Removed ${model.tableName} where ${column} = ${value}`);
    return result;
  } catch (error) {
    console.log(`Error when removing ${model.tableName} where ${column} = ${value}: ${error}`);
    return null;
  }
}

module.exports = {
  selectFromDb,
  selectAllFromDb,
  insertToDb,
  update,
  remove
};