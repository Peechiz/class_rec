module.exports = function(app, config, db) {

  var students = require('../routes/students')(db);
  app.use('/students', students);

}
