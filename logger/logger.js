const winston = require('winston');
const { transports, format, createLogger } = winston;

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: new transports.File({filename: 'server-logs.log'})
  });

exports = logger;