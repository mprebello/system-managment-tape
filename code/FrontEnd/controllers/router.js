
/*
var config = require('../config/config.json');
var serverlink = "http://" +config.serverdata.host + ":" + config.serverdata.port;

module.exports = (app) => {
  const express = require('express');
  const request = require('request');

  function captureJsonFromBackEnd(){
    return new Promise ((resolve, reject) => {
      request(serverlink + '/tapes', { json: true }, (err, res, body) => {
          if (err) {
            return console.log('error');
            return reject('error');
          } else {
            return resolve(body);
          }
        });
    });
  }

  function generateViewLoginForm(resp, body){
    resp.marko(require('../views/tapes/showAllTapes.marko'),body);
  }

  async function openBookForm (resp) {
    var value = await Promise
      .resolve(1)
      .then(capture_list => captureJsonFromBackEnd())
      .then(capture_list => generateViewLoginForm(resp,capture_list))
      .catch(capture_list => console.log('error to capture'));
    return value;
  }

  app.get('/tapes', function(req, resp) {
    openBookForm(resp);
    });


  app.get('/login', function(req, resp) {
    resp.marko(require('../views/login/loginForm.marko'));
    });

  app.get('/reports', function(req, resp) {
    resp.marko(require('../views/reports/showReportIndex.marko'));
    });


  app.use('/js', express.static(__dirname + '/../node_modules/bootstrap/dist/js'));
  app.use('/css', express.static(__dirname + '/../node_modules/bootstrap/dist/css'));
  app.use('/js', express.static(__dirname + '/../node_modules/jquery/dist'));


};
*/
