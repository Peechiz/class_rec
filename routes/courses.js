module.exports = function(express, db) {

  var router = express.Router();

  router.route('/')
    .get( (req,res) => {
      // TODO make this flexible / configurable
      db.run('MATCH (n:Course) RETURN n SKIP 0 LIMIT 25')
        .then( result => {
          var data = [];
          result.records.forEach(record => {
            console.log('REC:',record._fields[0]);
            data.push(record._fields[0]);
          })
          db.close()
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
      db.run(`MATCH (c:Course {title: "${req.params.title}"})<--(q:Quarter {}) return q`)
        .then( result => {
          var data =[];
          console.log(result);
          result.records.forEach(record=>{
            console.log('REC:',record._fields[0]);
            data.push(record._fields[0]);
          })
          console.log(data);
          res.render('course', {data:data, title:req.params.title})
        })
        .catch(err => {
          console.log(err);
          res.send(err)
        })
      // get quarters for course

      // res.send(`display page for ${req.params.title}`)
    })

  router.route('/:title/edit')
    .get( (req,res) => {
      res.send(`editing page for ${req.params.title}`)
    })

  return router;
}
