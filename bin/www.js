const mongoose = require('mongoose');
const config = require('config');
const { app } = require('../app');
const winston = require('winston');
const { transports, format } = winston;

let logger = winston.createLogger({
  level: 'info',
  format: format.json(),
  transports: new transports.File({filename: 'process.log'}),
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ]
  })

const port = process.env.PORT || 3001;
const dbUrl = process.env.MONGODB_URI || config.get('db');

if (app.get('env') === 'development') {
  mongoose
    .connect(dbUrl, {
      bufferCommands: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500
    })
    .then(() => {
      console.log(`connected to mongodb ${dbUrl} successfully`);
    })
    .catch(err => console.log('connection to db was unsuccefull with error: ', err));

  mongoose.connection.on('disconnected', (err)=>{
    console.log(err);
  }) 
} 

process.on('unhandledrejection', function (err) {
  logger.error(err);
})
process.on('exit', code => logger.error(`process exited on code: ${code}`));


const server = app.listen(port, err => console.log(`server started at port ${port}`));

module.exports = server;
