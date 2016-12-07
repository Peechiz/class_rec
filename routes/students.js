module.exports = function(db) {


  app.route('/')
    .get( (req,res) => {
      res.send('students main');
    })
    .post( (req,res) => {
      res.send('posting new student');
    })
    .delete( (req,res) => {
      res.send('deleting a student')
    })


  app.route('/:id')
    .get( (req,res) => {
      res.send(`display page for ${req.params.id}`)
    })


  app.route('/:id/edit')
    .get( (req,res) => {
      res.send(`editing page for ${req.params.id}`)
    })


}
