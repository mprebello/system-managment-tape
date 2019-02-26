
var config = require('../config/config.json');
var serverlink = "http://" +config.serverdata.host + ":" + config.serverdata.port;
console.log(serverlink);

module.exports = (app) => {

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

  app.get('/', function(req, resp) {
    openBookForm(resp);
    });

};
