var config = require('../config/config.json');
var serverlink = "http://" +config.serverdata.host + ":" + config.serverdata.port;

module.exports = (app) => {
async function generateViewAllTapes(req, resp){
  manageInformation = new app.persist.ManageInformation();
  //console.log(authUserInfo);
  const captureAllMedias = await manageInformation.captureAllMedias().catch(error => console.log(error));
  distinct_pool = distinctFields(captureAllMedias, 'Pool');
  distinct_servername = distinctFields(captureAllMedias, 'ServerName');
  distinct_projects = distinctFields(captureAllMedias, 'Project');
  distinct_repository = distinctFields(captureAllMedias, 'Repo');

  value_serial = req.query.serial ;
  value_media = req.query.media ;
  value_pool = req.query.pool;
  value_server = req.query.server ;
  value_project = req.query.project ;
  value_repository = req.query.repo ;

  resp.marko(require('../views/tapes/showAllTapes.marko'),{
    user_info: resp.authUserInfo,
    medias: captureAllMedias,
    pools: distinct_pool,
    servers: distinct_servername,
    projects: distinct_projects,
    repository: distinct_repository,
    value_serial: value_serial,
    value_media: value_media,
    value_pool: value_pool,
    value_server: value_server,
    value_project: value_project,
    value_repository: value_repository
  });
}

function distinctFields(data, field){
  pools = [];
  for (let number in data) {
    pool_now = data[number][field]
    if (! pools.includes(pool_now)) {
      pools.push(pool_now);
    }

  }
  return pools.sort();
}

app.get('/tapes', function(req, resp) {
  generateViewAllTapes(req, resp);
  });

}
