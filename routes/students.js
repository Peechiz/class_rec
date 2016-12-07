module.exports = function(express, db) {

  var router = express.Router();

  router.route('/')
    .get( (req,res) => {
      res.send('["jim","susan","chet"]');
    })
    .post( (req,res) => {
      res.send('posting new student');
    })
    .delete( (req,res) => {
      res.send('deleting a student')
    })

  router.route('/:id')
    .get( (req,res) => {
      res.send(`display page for ${req.params.id}`)
    })

  router.route('/:id/edit')
    .get( (req,res) => {
      res.send(`editing page for ${req.params.id}`)
    })

  return router;
}
