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