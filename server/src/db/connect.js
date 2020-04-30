'use strict';

const Sequelize = require('sequelize');

// read config for database
const {
  database
} = require('../../configuration.json');

// set additional options
const options = {
  host: database.host,
  dialect: database.dialect,
  define: {
    freezeTableName: true, // disable auto pluralizing table names
    timestamps: false // disable creating created_at and updated_at columns
  }
}

// create the connection
let sequelize = new Sequelize(database.name, database.user, database.password, options);

// create initial table
(async () => {
  await sequelize.query(`create table if not exists WEBSITE (
    WEBSITE_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TITLE VARCHAR(100) NOT NULL UNIQUE,
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
})();

// check if connection is working
sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully connected to database.');
  })
  .catch(error => {
    sequelize = undefined;
    console.log('Could not connect to database. Check if database container is running and your credentials are correct.');
  });

module.exports = sequelize;
