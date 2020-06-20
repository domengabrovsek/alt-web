'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../utils/connect');

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
});

module.exports = Website;