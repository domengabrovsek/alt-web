const sql = require('mssql');
const Sequelize = require('sequelize');
const Logger = require('./logger');

const createDefaultDbIfNotExists = async (options) => {
  const query = `if(db_id(N'${process.env.DB_NAME}') IS NULL) create database ${process.env.DB_NAME};`;

  await sql.connect(options)
    .then(async (conn) => await conn.query(query))
    .catch(error => {
      Logger.error(`Error while trying to connect to master!`);
      Logger.error(error);
      throw (error);
    });
};

module.exports = async () => {

  // mssql options
  const options = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.HOST,
    database: process.env.DB_DEFAULT_NAME,
    options: {
      validateBulkLoadParameters: true,
      enableArithAbort: true
    }
  };

  // if database doesn't exists, create it, otherwise just connect to it
  await createDefaultDbIfNotExists(options);

  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
      host: process.env.HOST,
      dialect: process.env.DIALECT,
      logging: false,
      freezeTableName: true
    });

  await sequelize
    .authenticate()
    .then(async () => {
      Logger.info(`Successfully estabilished connection to database: ${process.env.DB_NAME}`);

      Logger.info('Creating table WEBSITE if not exists.');
      await createWebsiteTable(sequelize);
      Logger.info('Table WEBSITE created.');

      Logger.info('Creating table ALTERNATIVE if not exists.');
      await createAlternativesTable(sequelize);
      Logger.info('Table ALTERNATIVE created.');
    })
    .catch(error => {
      Logger.error(`Error while trying to connect to database: ${process.env.DB_NAME}`);
      Logger.error(error);
    });
};

const createAlternativesTable = async (sequelize) => {
  await sequelize.query(
    `
    if not exists(select *
      from sysobjects
      where name = 'ALTERNATIVE')
    create table ALTERNATIVE
    (
    WEBSITE_ID       INT          NOT NULL IDENTITY (1,1) PRIMARY KEY,
    WEBSITE_NAME     VARCHAR(100) NOT NULL,
    ALTERNATIVE_NAME VARCHAR(100) NOT NULL UNIQUE
    )
  `);
};

const createWebsiteTable = async (sequelize) => {
  await sequelize.query(`
  if not exists(select *
    from sysobjects
    where name = 'WEBSITE')
  create table WEBSITE
  (
    WEBSITE_ID   INT          NOT NULL IDENTITY (1,1) PRIMARY KEY,
    TITLE        VARCHAR(100) NOT NULL UNIQUE,
    DESCRIPTION  TEXT         NULL,
    ALTERNATIVES TEXT         NULL,
    NO_OF_LIKES  SMALLINT     NULL,
    OVERVIEW     TEXT         NULL,
    PLATFORMS    TEXT         NULL,
    WEBSITE      VARCHAR(100) NULL,
    FEATURES     TEXT         NULL,
    CATEGORIES   TEXT         NULL,
    TAGS         TEXT         NULL,
    RATING       TINYINT      NULL
  )
`);
};
