const request = require('request');
var config = require('../config/config.json');
var jwt = require('jsonwebtoken');
var passport     = require('passport');
var LdapStrategy = require('passport-ldapauth');
var ldapOptions = {
          server: {
            url: config.authentication.ldapserver,
            searchBase: config.authentication.searchBase,
            searchFilter: config.authentication.filter
          }
        };

class AuthUser {
  constructor(){
    this._jwt_answer = '';
  }

  validateUsers(user, password){
    this._user = user;
    console.log(this._user);
    return new Promise ((resolve, reject) => {
      if (this._user == 'teste'){
        var generate_token = this._createToken();
        return resolve(generate_token);
      }
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
      var token = jwt.sign({ login:this._user }, config.authentication.secretKeyToken, {
        expiresIn: 8600}
      );
      return token;
    }

  _destroyToken(){
      var token = jwt.sign({login:this._user}, config.authentication.secretKeyToken, {
        expiresIn: 8600}
      );
      return token;
    }

  validateToken(req){
    var token = req.cookies['mytapesystem'];
    console.log(token);
    return new Promise ((resolve, reject) => {
      if (token){
        jwt.verify(token, config.authentication.secretKeyToken, function(err, decoded){
          if (err) { return reject(err);
          } else {
            //this._jwt_answer = decoded;
            return resolve(decoded);
          }
          });
         }
          return reject('no token');
      });
    }

  /*getAnswerAuth(){
      return this._jwt_answer;
    }*/

  _validateUserOnLdap(){
    passport.use(new LdapStrategy(ldapOptions));
  }

}


module.exports = function(){
    return AuthUser;
};
