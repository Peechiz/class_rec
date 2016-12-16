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
          console.log(data);
          res.render('programs', {data:data})
        })
        .catch( err => {
          console.log(err);
          res.send(err)
        })
    })
    .post( (req,res) => {
      res.send('posting new program');
    })
    .delete( (req,res) => {
      res.send('deleting a program')
    })

  router.route('/:title')
    .get( (req,res) => {
        // var start = new Date();
        var query = api.get.programByTitle(req.params.title)
        session.run(query)
          .then( result => {
            var data = result.records[0]._fields[0]
            res.send(data)
            session.close();
            // var end = new Date();
            // console.log('Process complete in: ');
            // console.log(end - start + 'ms');
          })
          .catch( err => {
            console.log(err);
            res.send(err)
          })
    })
    .post( (req,res) => {
      console.log(req.body);
      res.send('RECIEVED POST REQUEST')
    })

  router.route('/:title/edit')
    .get( (req,res) => {
      res.render('program_edit')
    })

  return router;
}
