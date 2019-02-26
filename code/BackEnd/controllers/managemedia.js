module.exports = function(app){
  app.get('/tapes', function(req, res){
    var connection = app.persistencia.connectionFactory();
    var manageMedia = new app.persistencia.ManageMedia(connection);
    var teste = manageMedia.lista();
    manageMedia.lista(function(erro, resultado){
      if(erro){
        console.log('Error on verify query:' + erro);
        res.status(500).send(erro);
      } else {
        res.status(201).json(resultado);
    }
    });

  });

}
