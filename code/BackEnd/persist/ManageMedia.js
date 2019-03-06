class ManageMedia2 {
  constructor(connection){
    this._connection = connection;
     //condition = [ GROUP, 'A1%', 'S1%', 'M1%', 'D1%', 'ESP_6_ANOS_INT' ];
  }

  captureMediasFromProject(project){
    resultado = this._connection.query('SELECT Pool FROM Library where PROJECT = ?;',[project]);
    return resultado;
  }

  endDbConnection(){
    this._connection.end();
  }


  listAllTapes(){
    return new Promise ( (resolve, reject) => {
      this._connection.query('select * from Library', (error, tapes) => {
        if (error) {
          return reject('erro');
        }
        return resolve(tapes);
      });
    });
  }

  captureAllGroups(){
    return new Promise ( (resolve, reject) => {
      this._connection.query('SELECT DISTINCT(Project) as PROJECT FROM Library;', (error, groups) => {
        if (error) { return reject('error'); }
        return resolve(groups);
      });
    });
  }

  captureAllTapeByGroups(GROUP){
    return new Promise ( (resolve, reject) => {
      this._connection.query('SELECT * FROM Library where Project = ?;',[GROUP],(error, specif_tapes) => {
        if (error) {
          return reject('error');
        }
        return resolve(specif_tapes);
      });
    });
  }

  captureAllTapeByGroupsOnScratch(GROUP){
    return new Promise ( (resolve, reject) => {
      var condition = 'SCRATCH%';
      this._connection.query('SELECT COUNT(MediaSerial) as RESULT FROM Library where Project = ? and Pool like ?;',[GROUP, condition],(error, specif_tapes) => {
        if (error) {
          return reject('error');
        }
        return resolve(specif_tapes);
      });
    });
  }

  captureAllTapeByGroupsOnRemote(GROUP){
    return new Promise ( (resolve, reject) => {
      //var condition = [ 'NFE_SPC', 'A2', 'S2', 'M2', 'D2', 'ESP_6_ANOS', 'NFE_SPC', 'NFE_WLY', 'NFE_MLY' ]
      var condition = [ GROUP, 'NFE_SPC%', 'A2%', 'S2%', 'M2%', 'D2%', 'ESP_6_ANOS', 'NFE_SPC%', 'NFE_WLY%', 'NFE_MLY%' ];
      this._connection.query(
        'SELECT COUNT(MediaSerial) as RESULT FROM Library where Project = ? and (Pool like ? or Pool like ? or Pool like ? or Pool like ? or Pool like ? or Pool like ? or Pool like ? or Pool like ? or Pool like ?);',condition,(error, specif_tapes) => {
        if (error) {
          return reject('error');
        }
        return resolve(specif_tapes);
      });
    });
  }

  captureAllTapeByGroupsOnLocal(GROUP){
    return new Promise ( (resolve, reject) => {
      var condition = [ GROUP, 'A1%', 'S1%', 'M1%', 'D1%', 'ESP_6_ANOS_INT' ];
      this._connection.query('SELECT COUNT(MediaSerial) as RESULT FROM Library where Project = ? and (Pool like ? or Pool like ? or Pool like ? or Pool like ? or Pool like ?);',condition,(error, specif_tapes) => {
        if (error) {
          return reject('error');
        }
        return resolve(specif_tapes);
      });
    });
  }

  captureAllTapeByGroupsTotal(GROUP){
    return new Promise ( (resolve, reject) => {
      var condition = 'SCRATCH%';
      this._connection.query('SELECT COUNT(MediaSerial) as RESULT FROM Library where Project = ?;',[GROUP],(error, specif_tapes) => {
        if (error) {
          return reject('error');
        }
        return resolve(specif_tapes);
      });
    });
  }

}

module.exports = function(){
    return ManageMedia2;
};
