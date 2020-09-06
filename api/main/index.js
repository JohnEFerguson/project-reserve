'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  env = require('./config/env.js'),
  db = require('./config/db.js'),
  router = require('./router/index');

const app = express();
const PORT = env.PORT;

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router(app, db);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log('listening on port:', PORT);
  });
});

module.exports = app
