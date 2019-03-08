const request = require('request');
var config = require('../config/config.json');
var jwt = require('jsonwebtoken');

class AuthUser {
  constructor(){
    this._jwt_answer = '';
  }

  validateUsers(user, password){
    this._user = user;
    return new Promise ((resolve, reject) => {
      if (this._user == 'teste'){
        var generate_token = this._createToken();
        return resolve(generate_token);
      }
        return reject('nook');
      });
    }


  generateToken(username){
    this._user = username;
    return new Promise ((resolve, reject) => {
        var generate_token = this._createToken();
        return resolve(generate_token);
        return reject('nook');
      });
    }

  validateTokenAlwaysTrue(req){
      var token = '1';
      return new Promise ((resolve, reject) => {
         if ( '1' == '1' ) { return reject('notok'); }
         return resolve('ok');
       });
    }

  _createToken(){
    var token = jwt.sign({ login:this._user }, config.authentication.secretKeyToken, { expiresIn: 8600 });
    return token;
  }

  _destroyToken(res){
      resp.clearCookie('mytapesystem');
    }

  validateToken(req){
    var token = req.cookies['mytapesystem'];
    return new Promise ((resolve, reject) => {
      if (token){
        jwt.verify(token, config.authentication.secretKeyToken, function(err, decoded){
          if (err) { return reject(err);
          } else {
            return resolve(decoded);
          }
          });
         }
          return reject('no token');
      });
    }

}


module.exports = function(){
    return AuthUser;
};
