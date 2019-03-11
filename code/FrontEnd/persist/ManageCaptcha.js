const request = require('request');
var config = require('../config/config.json');

class ManageCaptcha {

  constructor(){
    this._config_server_side = config.authentication.google_recaptcha_server_side;
    this._config_client_side = config.authentication.google_recaptcha_client_side;
    this._config_site_to_verify = config.authentication.google_verify_site;
    this._config_proxy = config.authentication.proxy_to_access;
    this._config_auth_mode = config.authentication.mode;
    this._client_answer = '';
  }

  getClientKey(){
    return this._config_client_side;
  }

  validateToken(req){
    this._client_ip = req.connection.remoteAddress;
    this._client_answer = req.body.recaptcha_response;
    return new Promise ((resolve, reject) => {
      if (this._config_auth_mode == 'desenv'){
        return resolve('desenv mode');
      }

      if (this._client_answer == '' ){
        return reject ('Erro no Captcha');
      }
      this._url_to_access = this._config_site_to_verify + '?secret=' + this._config_server_side  + '&response=' + this._client_answer + '&remoteip=' + this._client_ip;
      var request_proxy = request.defaults({'proxy': this._config_proxy});
      request_proxy(this._url_to_access, (err, res, body) => {
        if (err){
          console.log(err);
          return reject(err);
        }
          body = JSON.parse(body);
          if (body.success == true){
            console.log('login with' + this._client_ip +" "+ req.body.username )
            return resolve(body);
          } else {
            console.log('login error' + this._client_ip +" "+ req.body.username )
            return reject(body);
          }

        });
      });
    }
}


module.exports = function(){
    return ManageCaptcha;
};
