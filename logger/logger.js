const winston = require('winston');
const config = require('config');

require('winston-mongodb');

const { transports, format, createLogger } = winston;

const dbUrl = process.env.MONGODB_URI || config.get('db');

const logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: new transports.Console()
  });

  logger.add(new winston.transports.MongoDB({
    level: 'info',
    db: dbUrl,
    collection: 'logs',
    name: 'applogger',
    capped: true,
    cappedSize: 5000000,
    cappedMax: 5,
    decolorize: true,
  }))

module.exports.logger = logger;