const api = require('../neo4j/query_builder');

module.exports = function(express, db) {

  var session = db
  var router = express.Router();

  router.route('/')
    .get( (req,res) => {
      // TODO make this flexible / configurable
      session.run('MATCH (n:Program) RETURN n SKIP 0 LIMIT 25')
        .then( result => {
          var data = [];
          result.records.forEach(record => {
            console.log('REC:',record._fields[0]);
            data.push(record._fields[0]);
          })
          session.close()
          // res.send(data);
          console.log(data);
          res.render('courses', {data:data})
        })
        .catch( err => {
          console.log(err);
          res.send(err)
        })
    })
    .post( (req,res) => {
      res.send('posting new course');
    })
    .delete( (req,res) => {
      res.send('deleting a course')
    })

  router.route('/:title')
    .get( (req,res) => {
        var query = api.get.programByTitle(req.params.title)
        session.run(query)
          .then( result => {
            res.send(result)
          })
          .catch( err => {
            console.log(err);
            res.send(err)
          })
    })

  router.route('/:title/edit')
    .get( (req,res) => {
      res.send(`editing page for ${req.params.title}`)
    })

  return router;
}
