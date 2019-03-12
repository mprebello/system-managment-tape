class ManageMedia2 {
  constructor(connection){
    this._connection = connection;
     //condition = [ GROUP, 'A1%', 'S1%', 'M1%', 'D1%', 'ESP_6_ANOS_INT' ];
    this._condition_scratch = [ 'SCRATCH%' ];
    this._condition_external = [ 'NFE_SPC%', 'A2%', 'S2%', 'M2%', 'D2%', 'ESP_6_ANOS', 'NFE_SPC%', 'NFE_WLY%', 'NFE_MLY%' ];
    this._condition_local = [ 'A1%', 'S1%', 'M1%', 'D1%', 'ESP_6_ANOS_INT' ];
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
      this._connection.query('select * from Library Order By MediaSerial', (error, tapes) => {
        if (error) {
          return reject('erro');
        }
        var tapes_with_repository = this._insertRepository(tapes);
        return resolve(tapes_with_repository);
      });
    });
  }

  _getDates(){

    var date_last_2_days = new Date();
    date_last_2_days.setDate(date_last_2_days.getDate() - 2);
    date_last_2_days.setHours(0);
    date_last_2_days.setMinutes(0);
    date_last_2_days.setSeconds(0);
    this._date_last_2_days = date_last_2_days.toISOString().replace('T', ' ').substr(0, 19);

    var date_yesterday_begin = new Date();
    date_yesterday_begin.setDate(date_yesterday_begin.getDate() - 1);
    date_yesterday_begin.setHours(0);
    date_yesterday_begin.setMinutes(0);
    date_yesterday_begin.setSeconds(0);
    this._date_yesterday_begin = date_yesterday_begin.toISOString().replace('T', ' ').substr(0, 19);

    var date_yesterday_final = new Date();
    date_yesterday_final.setDate(date_yesterday_final.getDate() - 1);
    date_yesterday_final.setHours(23);
    date_yesterday_final.setMinutes(59);
    date_yesterday_final.setSeconds(59);
    this._date_yesterday_final = date_yesterday_final.toISOString().replace('T', ' ').substr(0, 19);

    var date_today_begin = new Date();
    date_today_begin.setHours(0);
    date_today_begin.setMinutes(0);
    date_today_begin.setSeconds(0);
    this._date_today_begin = date_today_begin.toISOString().replace('T', ' ').substr(0, 19);

    var date_today_final = new Date();
    date_today_final.setHours(23);
    date_today_final.setMinutes(59);
    date_today_final.setSeconds(59);
    this._date_today_final = date_today_final.toISOString().replace('T', ' ').substr(0, 19) ;

    var date_tommorrow_final = new Date();
    date_tommorrow_final.setDate(date_tommorrow_final.getDate() + 1);
    date_tommorrow_final.setHours(23);
    date_tommorrow_final.setMinutes(59);
    date_tommorrow_final.setSeconds(59);
    this._date_tommorrow_final = date_tommorrow_final.toISOString().replace('T', ' ').substr(0, 19) ;
  }

  listTapesWrittenToday(){
    this._getDates();
    var begin = this._date_last_2_days ;
    var end = this._date_today_final ;
    var select_now = 'Select MediaSerial, '
    select_now += 'MediaName, '
    select_now += 'Pool, '
    select_now += 'ServerName, '
    select_now += 'Project, '
    select_now += 'LastWritten, '
    select_now += 'ExpirationDate, '
    select_now += 'DATEDIFF(ExpirationDate,CURDATE()) as DAYS_TO_EXPIRE '
    select_now += 'From Library where '
    select_now += 'LastWritten > \'' + begin + '\' and '
    select_now += 'LastWritten < \'' + end + '\' '
    select_now += 'ORDER BY LastWritten DESC'
    return new Promise ( (resolve, reject) => {
          this._connection.query( select_now,(error, tapes) => {
        if (error) {
          return reject(error);
        }
        var tapes_with_repository = this._insertRepository(tapes);
        return resolve(tapes_with_repository);
      });
    });
  }

  listsTapesThatWillExpire(){
    this._getDates();
    var begin = this._date_today_begin ;
    var end = this._date_tommorrow_final ;
    var select_now = 'Select MediaSerial, '
    select_now += 'MediaName, '
    select_now += 'Pool, '
    select_now += 'ServerName, '
    select_now += 'Project, '
    select_now += 'LastWritten, '
    select_now += 'ExpirationDate, '
    select_now += 'DATEDIFF(ExpirationDate,CURDATE()) as DAYS_TO_EXPIRE '
    select_now += 'From Library where '
    select_now += 'ExpirationDate > \'' + begin + '\' and '
    select_now += 'ExpirationDate < \'' + end + '\' '
    select_now += 'ORDER BY DAYS_TO_EXPIRE'
    return new Promise ( (resolve, reject) => {
      this._connection.query(select_now, (error, tapes) => {
        if (error) {
          return reject('erro');
        }
        var tapes_with_repository = this._insertRepository(tapes);
        return resolve(tapes_with_repository);
      });
    });
  }

  listsTapesThatMustBeMovedToScratch(){
    this._getDates();
    var begin = this._date_yesterday_begin ;
    var end = this._date_yesterday_final ;
    var select_now = 'Select MediaSerial, '
    select_now += 'MediaName, '
    select_now += 'Pool, '
    select_now += 'ServerName, '
    select_now += 'Project, '
    select_now += 'LastWritten, '
    select_now += 'ExpirationDate, '
    select_now += 'DATEDIFF(ExpirationDate,CURDATE()) as DAYS_TO_EXPIRE '
    select_now += 'From Library where '
    select_now += 'ExpirationDate > \'' + begin + '\' and '
    select_now += 'ExpirationDate < \'' + end + '\' '
    select_now += 'ORDER BY DAYS_TO_EXPIRE'
    return new Promise ( (resolve, reject) => {
      this._connection.query(select_now, (error, tapes) => {
        if (error) {
          return reject('erro');
        }
        var tapes_with_repository = this._insertRepository(tapes);
        return resolve(tapes_with_repository);
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


  _insertRepository(tapes){
    var tapes_filtered = []
    for (let number in tapes) {
      var tape_now = tapes[number];
      var tape_pool = tape_now.Pool;
      var tape_pool_name = this._validatePool(tape_pool);
      tape_now['Repo'] = tape_pool_name;
      tapes_filtered.push(tape_now);
    }
      return tapes_filtered;
  }

  _validatePool(pool){
    var repository;
    //this._condition_scratch = [ 'SCRATCH%' ];
    //this._condition_external = [ 'NFE_SPC%', 'A2%', 'S2%', 'M2%', 'D2%', 'ESP_6_ANOS', 'NFE_SPC%', 'NFE_WLY%', 'NFE_MLY%' ];
    //this._condition_local = [ 'A1%', 'S1%', 'M1%', 'D1%', 'ESP_6_ANOS_INT' ];
    var condition_scratch = /^SCRATCH/i ;
    var condition_local = /^S2|^S1|^M1|^D1|^ESP_6_ANOS_INT$/ ;
    switch (pool) {
      case (pool.match(condition_scratch) || {}).input:
        repository = 'reciclagem'
        break;
      case (pool.match(condition_local) || {}).input:
        repository = 'local'
        break;
      default:
        repository = 'externo';
        break;
    }
    return repository;

    //return 'reciclagem';
    //return 'local'
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
