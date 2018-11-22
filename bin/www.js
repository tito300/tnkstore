const mongoose = require('mongoose');
const config = require('config');
const { app } = require('../app');

const port = process.env.PORT || 3001;
const dbUrl = config.get('db');

if (app.get('env') === 'development') {
  mongoose
    .connect(dbUrl)
    .then(() => {
      console.log(`connected to mongodb ${dbUrl} successfully`);
    })
    .catch(err => console.log('connection to db was unsuccefull with error: ', err));
}

const server = app.listen(port, err => console.log(`server started at port ${port}`));

module.exports = server;
