module.exports = (app) => {
  async function validateUser(req, resp){
    user = req.body.user;
    password = req.body.password;
    authUser = new app.persist.AuthUser();
    await authUser.validateUsers(user, password)
          .then(result => {
            resp.set('x-access-token', result);
            resp.cookie('mytapesystem', result);
            resp.redirect('./reports');
          })
          .catch(error => resp.redirect('./login'));
  }

  app.post('/auth', function(req, resp) {
    validateUser(req, resp);
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
