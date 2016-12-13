module.exports = function(app, config, db, express) {

  var students = require('../routes/students')(express,db);
  var courses = require('../routes/courses')(express,db);
  app.use('/students', students);
  app.use('/courses', courses);
}
