var app = require('./config/custom-express')();
var config = require('./config/config.json');

app.listen(config.server.port, function(){
  console.log('BackEnd Server Running on port ' + config.server.port);
});
