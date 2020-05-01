'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../connect');

const Title = sequelize.define('TITLE', {
  title_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  title: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Title;