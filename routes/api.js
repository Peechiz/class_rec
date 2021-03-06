const api = require('../neo4j/query_builder');

module.exports = function(express, db) {

  var session = db
  var router = express.Router();

  // localhost:9001/api/program
  router.route('/')
    .get( (req,res) => {
      // TODO make this flexible / configurable
      session.run('MATCH (n:Program) RETURN n SKIP 0 LIMIT 25')
        .then( result => {
          var data = [];
          result.records.forEach(record => {
            data.push(record._fields[0]);
          })
          session.close()
          console.log(data);
          res.send(data)
        })
        .catch( err => {
          console.log(err);
          res.send(err)
        })
    })
    .post( (req,res) => {
      var query = api.create.program({title: req.body.title })
      console.log('QUERY: '+ query);
      session.run(query)
        .then( data => {
          res.send('posting new program ' + req.body.title);
          session.close();
        })
        .catch( err => {
          console.log(err);
        })
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
    .put( (req,res) => {
      // update attrs
      var query = api.get.programByTitle(req.params.title, null)
                  + " " + api.set(req.body)
      // TODO uncomment when ready to test for reals
      session.run(query)
        .then(result => {
          session.close()
          res.sendStatus(200)
        })
        .catch( err => {
          console.log(err);
          res.send('WHOOPS')
        })

      // // test
      // console.log(query);
      // res.send(query)
    })
    .delete( (req,res) => {
      var query = api.delete.programByTitle(req.params.title)
      // console.log('QUERY: '+ query);
      session.run(query)
        .then( result => {
          res.send('Oh snap you delete it')
          session.close();
        })
        .catch( err => {
          console.log(err);
        })
    })

  router.route('/:title/:attr')
    .delete((req,res) => {
      console.log(`Deleting ${req.params.attr} on ${req.params.title}`)
      
      var query = api.get.programByTitle(req.params.title, null)
                  + api.remove([req.params.attr])
      session.run(query)
        .then(result => {
          session.close();
          res.send(result);
        })
        .catch( err => {
          console.log(err);
        })
    })

  return router;
}
