module.exports = function(app){
  async function captureTapes(res, query_to_do){
    var connection = app.persist.connectionFactory();
    var manageMedia = new app.persist.ManageMedia(connection);

    switch(query_to_do){
      case 'writtentoday':
        var capture_tapes = await manageMedia.listTapesWrittenToday().catch(error => console.log(error));
        break;
      case 'willexpire':
        var capture_tapes = await manageMedia.listsTapesThatWillExpire().catch(error => console.log(error));
        break;
      case 'movetoscratch':
        var capture_tapes = await manageMedia.listsTapesThatMustBeMovedToScratch().catch(error => console.log(error));
        break;
      case 'All':
        var capture_tapes = await manageMedia.listAllTapes().catch(error => console.log(error));
        break;
    }
    //const captureAllTapes = await manageMedia.listAllTapes().catch(error => console.log(error));
    manageMedia.endDbConnection();
    res.status(201).json(capture_tapes);
  }

  app.get('/tapes', function(req, res){
    query_to_do = 'All';
    captureTapes(res, query_to_do);
    });

  app.get('/tapes/writtentoday', function(req, res){
      query_to_do = 'writtentoday';
    captureTapes(res, query_to_do);
    });

  app.get('/tapes/willexpire', function(req, res){
      query_to_do = 'willexpire';
    captureTapes(res, query_to_do);
    });

  app.get('/tapes/movetoscratch', function(req, res){
      query_to_do = 'movetoscratch';
    captureTapes(res, query_to_do);
    });

}
