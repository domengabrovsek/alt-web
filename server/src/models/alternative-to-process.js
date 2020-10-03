'use strict';

const { sequelize, Sequelize } = require('../config/options');

const Alternative = sequelize.define('ALTERNATIVE_TO_PROCESS', {
  website_id: { type: Sequelize.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  website_name: { type: Sequelize.STRING, allowNull: false },
  alternative_name: { type: Sequelize.STRING, allowNull: false },
  web_alt_id: { type: Sequelize.STRING, allowNull: false, unique: true }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Alternative;
