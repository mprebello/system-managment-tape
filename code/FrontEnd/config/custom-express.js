require('marko/node-require').install();
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
