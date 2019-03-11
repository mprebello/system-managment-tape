require('marko/node-require').install();
require('marko/express');
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');

module.exports = function(){
  var app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(expressValidator());

  consign()
   .include('controllers/login.js')
   .then('controllers/statics.js')
   .then('controllers/auth.js')
   .then('controllers')
   .then('persist')
   .into(app);

  return app;
}
