module.exports = (app) => {
async function generateViewLogin(resp){
  //manageInformation = new app.persist.ManageInformation();
  //const captureReportMedias = await manageInformation.captureReportMedias().catch(error => console.log(error));
  resp.marko(require('../views/login/loginForm.marko'));
}

app.get('/login', function(req, resp) {
  generateViewLogin(resp);
  });

}
