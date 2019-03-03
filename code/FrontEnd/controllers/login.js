module.exports = (app) => {
async function generateViewLogin(resp){
  //manageInformation = new app.persist.ManageInformation();
  //const captureReportMedias = await manageInformation.captureReportMedias().catch(error => console.log(error));
  resp.marko(require('../views/login/loginForm.marko'));
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
