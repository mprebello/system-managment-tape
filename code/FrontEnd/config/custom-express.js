/*require('marko/node-require').install();
require('marko/express');

const express = require('express');
const app = express();
const routes = require('../controllers/router');
routes(app);

app.use((err, req, res, next) => {
  console.error(err.stack);
	res.status(500).json({ error: err.toString() });
});

module.exports = app;

*/
require('marko/node-require').install();
require('marko/express');
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
  var app = express();

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use(expressValidator());

  consign()
   .include('controllers')
   .then('persist')
   .into(app);

  return app;
}
