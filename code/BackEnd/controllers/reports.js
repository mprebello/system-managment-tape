module.exports = function(app){

async function captureTables(res){
  var connection = app.persist.connectionFactory();
  var manageMedia = new app.persist.ManageMedia(connection);
  const captureAllGroups = await manageMedia.captureAllGroups();

  var final_result = [];
  for (let group in captureAllGroups) {
    let group_now = captureAllGroups[group].PROJECT;
    const captureTotalScratch = await manageMedia.captureAllTapeByGroupsOnScratch(group_now).catch(error => console.log(error));
    const captureTotalRemote = await manageMedia.captureAllTapeByGroupsOnRemote(group_now).catch(error => console.log(error));
    const captureTotalLocal = await manageMedia.captureAllTapeByGroupsOnLocal(group_now).catch(error => console.log(error));
    const captureTotal = await manageMedia.captureAllTapeByGroupsTotal(group_now).catch(error => console.log(error));

    result_now = {
      "group" : group_now,
      "total_scratch": captureTotalScratch[0].RESULT,
      "total_remote": captureTotalRemote[0].RESULT,
      "total_local": captureTotalLocal[0].RESULT,
      "total": captureTotal[0].RESULT
    } ;
    final_result.push(result_now);
  }

  res.status(200).json(final_result);
}

app.get('/reports', function(req, res){
  captureTables(res);
});

}
