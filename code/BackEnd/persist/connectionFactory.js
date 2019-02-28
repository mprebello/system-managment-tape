var mysql  = require('mysql');
var config = require('../config/config.json');

function createDBConnection(){
		return mysql.createConnection({
			host     : config.database.host,
	    user     : config.database.user,
	    password : config.database.password,
	    database : config.database.database,
			multipleStatements: true,
			typeCast: function (field, next) {
			if (field.type == 'BLOB') {
					return field.string();
			}
				return next();
			}
		});
}


module.exports = function() {
	return createDBConnection;
}
