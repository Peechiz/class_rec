module.exports = function(app, config, db, express) {

  var program = require('../routes/program')(express,db);
  app.use('/program', program);
}
