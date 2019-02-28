var config = require('../config/config.json');
var serverlink = "http://" +config.serverdata.host + ":" + config.serverdata.port;

module.exports = (app) => {
async function generateViewAllTapes(resp){
  manageInformation = new app.persist.ManageInformation();
  const captureAllMedias = await manageInformation.captureAllMedias().catch(error => console.log(error));
  resp.marko(require('../views/tapes/showAllTapes.marko'),captureAllMedias);
}

app.get('/tapes', function(req, resp) {
  generateViewAllTapes(resp);
  });

}
