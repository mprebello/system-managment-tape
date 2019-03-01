module.exports = (app) => {
  express = require('express');
  app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js'));
  app.use('/jspub', express.static(__dirname + '/../views/public/js'));
  app.use('/csspub', express.static(__dirname + '/../views/public/css'));
  app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css'));
  app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist'));

}
