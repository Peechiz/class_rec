module.exports = function(app, config, db, express) {

  var api = require('../routes/api')(express,db);
  var program = require('../routes/program')(express,db);
  app.use('/api/program', api);
  app.use('/program', program);
}
