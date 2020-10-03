'use strict';

const Sequelize = require('sequelize');

const mysqlOptions = {
  user: process.env.ALT_WEB_DB_USER,
  password: process.env.ALT_WEB_DB_PASSWORD,
  host: process.env.ALT_WEB_HOST
};

const sequelize = new Sequelize(
  process.env.ALT_WEB_DB_NAME,
  process.env.ALT_WEB_DB_USER,
  process.env.ALT_WEB_DB_PASSWORD, {
  host: process.env.ALT_WEB_HOST,
  dialect: process.env.ALT_WEB_DIALECT,
  logging: false,
  freezeTableName: true
});

module.exports = {
  mysqlOptions,
  sequelize,
  Sequelize
}