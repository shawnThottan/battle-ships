const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./app/routes');

const port = process.env.PORT || 3000;

const app = express();
app.use('/', routes);
const connection = connect();

connection
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen);

function listen() {
  if (app.get('env') === 'test') return;
  app.listen(port);
  app.use(morgan('tiny'));
  console.log('Express app started on port ' + port);
}

function connect() {
  var options = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true
  };
  mongoose.connect(config.db, options);
  return mongoose.connection;
}

module.exports = {
  app,
  connection
};
