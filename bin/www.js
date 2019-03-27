const mongoose = require('mongoose');
const config = require('config');
const { app } = require('../app');
const winston = require('winston');
require('winston-mongodb');

const { transports, format } = winston;

const port = process.env.PORT || 3001;
const dbUrl = process.env.MONGODB_URI || config.get('db');

let logger = winston.createLogger({
  level: 'info',
  format: format.json(),
  transports: new transports.File({filename: 'process.log'}),
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ]
  })

  logger.add(new winston.transports.MongoDB({
    level: 'info',
    db: dbUrl,
    collection: 'logs',
    name: 'bin/www',
    capped: true,
    cappedSize: 5000000,
    cappedMax: 5,
    decolorize: true,
  }));

if (app.get('env') !== 'test') {
  console.log(`starting mongodb connection to: ${dbUrl}`)
  mongoose
    .connect(dbUrl, {
      bufferCommands: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500
    })
    .then(() => {
      console.log(`connected to mongodb ${dbUrl} successfully`);
    })
    .catch(err => {
      logger.error('connection to db was unsuccefull' + JSON.stringify(err));
      console.log(`failed mongodb connection with error: ${JSON.stringify(err)}`);
    });

  mongoose.connection.on('disconnected', (err)=>{
    console.log(`mongodb disconnected with error:`)
    console.log(err);
  }) 
}

process.on('unhandledrejection', function (err) {
  logger.error(err);
})
process.on('exit', code => logger.error(`process exited on code: ${code}`));


const server = app.listen(port, err => console.log(`server started at port ${port}. Env PORT is set to ${process.env.PORT}`));

module.exports = server;
