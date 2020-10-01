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


const Website = sequelize.define('WEBSITE', {
  website_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: true },
  alternatives: { type: Sequelize.STRING, allowNull: true },
  no_of_likes: { type: Sequelize.INTEGER, allowNull: true },
  overview: { type: Sequelize.TEXT, allowNull: true },
  platforms: { type: Sequelize.STRING, allowNull: true },
  website: { type: Sequelize.STRING, allowNull: true },
  features: { type: Sequelize.STRING, allowNull: true },
  categories: { type: Sequelize.STRING, allowNull: true },
  tags: { type: Sequelize.STRING, allowNull: true }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Website;
