'use strict';

const Sequelize = require('sequelize');
const sequelize = require('../utils/connect');

const Alternative = sequelize.define('ALTERNATIVE', {
  website_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  website_name: { type: Sequelize.STRING, allowNull: false },
  alternative_name: { type: Sequelize.STRING, allowNull: false }
});

module.exports = Alternative;
