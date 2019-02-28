module.exports = function(app){
  async function captureAllTapes(res){
    var connection = app.persist.connectionFactory();
    var manageMedia = new app.persist.ManageMedia(connection);
    const captureAllTapes = await manageMedia.listAllTapes().catch(error => console.log(error));
    res.status(201).json(captureAllTapes);
  }

  app.get('/tapes', function(req, res){
    captureAllTapes(res);
    });

}
