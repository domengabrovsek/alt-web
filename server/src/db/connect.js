'use strict';

const isDocker = require('is-docker');
const Sequelize = require('sequelize');

// read config for database
const {
  database
} = require('../../configuration.json');

console.log(`Running in docker: ${Boolean(isDocker())}`);

// set additional options
const options = {
  host: isDocker() ? database.docker_host : database.host,
  dialect: database.dialect,
  define: {
    freezeTableName: true, // disable auto pluralizing table names
    timestamps: false // disable creating created_at and updated_at columns
  },
  // disable logging; default: console.log
  logging: false
}

// create the connection
let sequelize = new Sequelize(database.name, database.user, database.password, options);

// check if connection is working
sequelize
  .authenticate()
  .then(async () => {
    console.log('Successfully connected to database.');
    // create initial table

    console.log('Creating initial table for websites.');
    await sequelize.query(`create table if not exists WEBSITE (
    WEBSITE_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TITLE VARCHAR(100) NOT NULL UNIQUE,
    QUERY VARCHAR(100) NOT NULL UNIQUE,
    DESCRIPTION TEXT NULL,
    ALTERNATIVES TEXT NULL,
    NO_OF_LIKES SMALLINT NULL,
    OVERVIEW TEXT NULL,
    PLATFORMS TEXT NULL,
    WEBSITE VARCHAR(100) NULL,
    FEATURES TEXT NULL,
    CATEGORIES TEXT NULL,
    TAGS TEXT NULL,
    RATING TINYINT NULL
);`);
    console.log('Done.');

    console.log('Creating initial table for titles.');
    await sequelize.query(`create table if not exists TITLE (
      TITLE_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      TITLE VARCHAR(100) NOT NULL UNIQUE
  );`);
    console.log('Done.');

  })
  .catch(error => {
    sequelize = undefined;
    console.log('Could not connect to database. Check if database container is running and your credentials are correct.');
  });

module.exports = sequelize;
