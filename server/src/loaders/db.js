'use strict';

const Logger = require('./logger');
const glob = require('glob');
const path = require('path');
const sql = require('mysql2');

const { mysqlOptions, sequelize } = require('../config/options');

module.exports = async () => {

  await createDefaultDbIfNotExists(mysqlOptions);

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
  const connection = sql.createConnection(options)
  connection.query(`create database if not exists ${process.env.ALT_WEB_DB_NAME};`)
};