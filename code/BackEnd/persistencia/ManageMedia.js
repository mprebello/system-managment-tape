function ManageMedia(connection) {
    this._connection = connection;
}

ManageMedia.prototype.lista = function(callback) {
    this._connection.query('select * from Library',callback);
}

ManageMedia.prototype.listAllTapes = function(callback) {
    this._connection.query('select * from Library',callback);
}

ManageMedia.prototype.listSpecificMedia = function(media,callback) {
    this._connection.query('select * from Library where MediaSerial = ?',[media], callback);
}

module.exports = function(){
    return ManageMedia;
};
