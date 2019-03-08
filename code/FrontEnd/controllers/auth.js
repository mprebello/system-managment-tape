module.exports = (app) => {
  async function validateUser(req, res){
    username = req.body.username;
    password = req.body.password;
    authUser = new app.persist.AuthUser();
    await authUser.generateToken(username)
          .then(result => {
            res.set('x-access-token', result);
            res.cookie('mytapesystem', result);
            res.redirect('./reports');
          })
          .catch(error => res.redirect('./login'));
  }

  app.post('/auth', function(req, res, next) {
    //this function will implement the captcha
    next();
  });

function initializeLdap(){
  var config = require('../config/config.json');
  var passport     = require('passport');
  var LdapStrategy = require('passport-ldapauth');
  var ldapOptions = {
            server: {
              url: config.authentication.ldapserver,
              searchBase: config.authentication.searchBase,
              searchFilter: config.authentication.filter
            }
          };
  passport.use(new LdapStrategy(ldapOptions));
  passport.initialize();
  return passport;
}
var passport = initializeLdap();

  app.post('/auth', passport.authenticate('ldapauth', {
    failureRedirect: '/login',
    session: false
  }),
   function(req, res){
    validateUser(req, res);
  });

   app.use('/*', function(req, res, next) {
    authUser = new app.persist.AuthUser();
    authUser.validateToken(req)
            .then(authUserInfo => {
              res.authUserInfo = authUserInfo ;
              next();
            })
            .catch(error => res.redirect('./login'));
    });


}
