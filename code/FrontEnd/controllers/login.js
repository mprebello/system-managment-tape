module.exports = (app) => {
async function generateViewLogin(resp){
  var config = require('../config/config.json');
  manageCaptcha = new app.persist.ManageCaptcha();
  var client_side_key = manageCaptcha.getClientKey();
  resp.marko(require('../views/login/loginForm.marko'), {
    client_side_key: client_side_key
  });
}

app.get('/login', function(req, resp) {
  authUser = new app.persist.AuthUser();
  authUser.validateToken(req)
          .then(ok => resp.redirect('./reports')).
          catch(error => generateViewLogin(resp));
  });

app.get('/logout', function(req, resp) {
  resp.clearCookie('mytapesystem');
  resp.redirect('./login');
  });

}
