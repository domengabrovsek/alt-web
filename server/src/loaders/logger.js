'use strict';

const { createLogger, format, transports, config } = require('winston');
const { combine, timestamp, label, printf, colorize } = format;

const myConfig = require('../config/index');

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const LoggerInstance = createLogger({
  level: myConfig.logs.level,
  levels: config.npm.levels,

  format: combine(
    label({ label: 'alt-web' }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    myFormat,
  ),
  transports: [new transports.Console()]
});

module.exports = LoggerInstance;
