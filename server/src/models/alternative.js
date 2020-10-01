'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    logging: false
  });

const Alternative = sequelize.define('ALTERNATIVE', {
  website_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  website_name: { type: Sequelize.STRING, allowNull: false },
  alternative_name: { type: Sequelize.STRING, allowNull: false }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Alternative;
