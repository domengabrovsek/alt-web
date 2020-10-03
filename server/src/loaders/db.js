'use strict';

const sql = require('mssql');
const Logger = require('./logger');
const glob = require('glob');
const path = require('path');

const { mssqlOptions, sequelize } = require('../config/options');

module.exports = async () => {

  // if database doesn't exists, create it, otherwise just connect to it
  await createDefaultDbIfNotExists(mssqlOptions);

  // connect to db any sync models(tables)
  await sequelize
    .authenticate()
    .then(() => {
      Logger.info(`Successfully estabilished connection to database: ${process.env.ALT_WEB_DB_NAME}`);
      syncModels()
    })
    .catch(error => {
      Logger.error(`Error while trying to connect to database: ${process.env.ALT_WEB_DB_NAME}`);
      Logger.error(error);
    });
};

const syncModels = () => {
  Logger.info('Starting model sync.')
  const modelsPath = glob.sync(`${path.resolve('./src/models')}/*`);
  modelsPath.forEach(modelPath => {
    const model = require(modelPath);
    Logger.info(`Syncing model: ${model.name}`);
    model.sync();
  })
  Logger.info('Done syncing models.')
}

const createDefaultDbIfNotExists = async (options) => {
  const query = `if(db_id(N'${process.env.ALT_WEB_DB_NAME}') IS NULL) create database ${process.env.ALT_WEB_DB_NAME};`;

  await sql.connect(options)
    .then(async (conn) => await conn.query(query))
    .catch(error => {
      Logger.error(`Error while trying to connect to master!`);
      Logger.error(error);
      throw (error);
    });
};