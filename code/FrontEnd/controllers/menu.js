module.exports = (app) => {

app.get('/menu', function(req, resp) {
  resp.marko(require('../views/menu/menu.marko'));
  });

}
