const request = require('request');
var config = require('../config/config.json');
var serverlink = "http://" +config.serverdata.host + ":" + config.serverdata.port;

class ManageInformation {
  constructor(){
    this._server_to_connect = serverlink;
  }

  captureAllMedias(){
    return new Promise ((resolve, reject) => {
      let path_to_access = this._server_to_connect + '/tapes';
      request( path_to_access,{ json: true }, (err, res, body) => {
        if (err) { return reject(error); }
        return resolve(body);
      });
    });
  }

  captureReportMedias(){
    return new Promise ((resolve, reject) => {
      let path_to_access = this._server_to_connect + '/reports';
      request( path_to_access,{ json: true }, (err, res, body) => {
        if (err) { return reject(error); }
        return resolve(body);
      });
    });
  }

}


module.exports = function(){
    return ManageInformation;
};
