// set environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  // default port
  port: process.env.PORT,

  // winston logging (error, warn, info, http, verbose, debug, silly)
  logs: {
    level: 'silly'
  }
};
