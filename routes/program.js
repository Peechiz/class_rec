module.exports = function(express) {

  var router = express.Router();

  router.route('/:title/edit')
    .get( (req,res) => {
      res.render('program_edit')
    })

  return router;
}
