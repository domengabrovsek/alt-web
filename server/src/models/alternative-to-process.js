'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.ALT_WEB_DB_NAME,
  process.env.ALT_WEB_DB_USER,
  process.env.ALT_WEB_DB_PASSWORD, {
  host: process.env.ALT_WEB_HOST,
  dialect: process.env.ALT_WEB_DIALECT,
  logging: false,
  freezeTableName: true
});

const Alternative = sequelize.define('ALTERNATIVE_TO_PROCESS', {
  website_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  website_name: { type: Sequelize.STRING, allowNull: false }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Alternative;
