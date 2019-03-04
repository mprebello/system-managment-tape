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

class AuthLdap {
  constructor(){
    this._jwt_answer = '';
  }

  _validateUserOnLdap(){
    passport.use(new LdapStrategy(ldapOptions));
    passport.initialize();
    passport.authenticate('ldapauth', {session: false}), function(req, res) {
      res.send({status: 'ok'});
    });
  }


  app.post('/login', passport.authenticate('ldapauth', {session: false}), function(req, res) {
    res.send({status: 'ok'});
  });


}



module.exports = function(){
    return LdapAuth;
};
