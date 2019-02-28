module.exports = (app) => {
  express = require('express');
  app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js'));
  app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css'));
  app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist'));

}
