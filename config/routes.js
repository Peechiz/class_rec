module.exports = function(app, config, db, express) {

  var students = require('../routes/students')(express,db);
  app.use('/students', students);
}
