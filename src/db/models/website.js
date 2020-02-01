'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../connect');

const Website = sequelize.define('WEBSITE', {
  website_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  name: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: true },
  no_of_reviews: { type: Sequelize.INTEGER, allowNull: true },
  no_of_alternatives: { type: Sequelize.INTEGER, allowNull: true },
  no_of_comments: { type: Sequelize.INTEGER, allowNull: true },
  no_of_likes: { type: Sequelize.INTEGER, allowNull: true },
  overview: { type: Sequelize.TEXT, allowNull: true },
  license_id: { type: Sequelize.INTEGER, allowNull: true },
  platform_id: { type: Sequelize.INTEGER, allowNull: true },
  official_website: { type: Sequelize.STRING, allowNull: true },
  feature_id: { type: Sequelize.INTEGER, allowNull: true },
  category_id: { type: Sequelize.INTEGER, allowNull: true },
  tag_id: { type: Sequelize.INTEGER, allowNull: true },
  rating: { type: Sequelize.INTEGER, allowNull: true }
});

module.exports = Website;