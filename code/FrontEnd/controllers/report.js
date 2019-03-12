module.exports = (app) => {
async function generateViewAllReports(resp){
  manageInformation = new app.persist.ManageInformation();
  const captureReportMedias = await manageInformation.captureReportMedias().catch(error => console.log(error));
  var captureReportWrittenToday = await manageInformation.captureReportWrittenToday().catch(error => console.log(error));
  var captureReportWillExpire = await manageInformation.captureReportWillExpire().catch(error => console.log(error));
  var captureReportMoveToScratch = await manageInformation.captureReportMoveToScratch().catch(error => console.log(error));
  resp.marko(require('../views/reports/showReportIndex.marko'),{
    user_info: resp.authUserInfo,
    reportmedias: captureReportMedias,
    medias_written_today: captureReportWrittenToday,
    medias_written_today_subject: 'Fitas Escritas Ontem',
    medias_will_expire: captureReportWillExpire,
    medias_will_expire_subject: 'Fitas a Expirar entre Hoje e Amanha',
    medias_move_to_scratch: captureReportMoveToScratch,
    medias_move_to_scratch_subject: 'Fitas Expiradas Hoje'
  }
);
}

app.get('/reports', function(req, resp) {
  generateViewAllReports(resp);
  });

}
