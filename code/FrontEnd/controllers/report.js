module.exports = (app) => {
async function generateViewAllReports(resp){
  manageInformation = new app.persist.ManageInformation();
  const captureReportMedias = await manageInformation.captureReportMedias().catch(error => console.log(error));
  resp.marko(require('../views/reports/showReportIndex.marko'),{
    user_info: resp.authUserInfo,
    reportmedias: captureReportMedias
  }
);
}

app.get('/reports', function(req, resp) {
  generateViewAllReports(resp);
  });

}
