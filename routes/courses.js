module.exports = function(express, db) {

  var router = express.Router();

  router.route('/')
    .get( (req,res) => {
      // TODO make this flexible / configurable
      db.run('MATCH (a:Article)-[*]->(b) RETURN a,b')
        .then( result => {
          var data = [];
          result.records.forEach(record => {
            console.log('REC:',record._fields[0]);
            data.push(record._fields[0]);
          })
          db.close()
          res.send(data);
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
      res.send(`display page for ${req.params.title}`)
    })

  router.route('/:title/edit')
    .get( (req,res) => {
      res.send(`editing page for ${req.params.title}`)
    })

  return router;
}
