const web_server = require('./config/custom-express');
var config = require('./config/config.json');

web_server.listen(config.server.port, function() {
    console.log("FronEnd server running on port " + config.server.port);
});
