module.exports = function (config, neo4j) {
  var driver = neo4j.v1.driver(config.db.address, neo4j.v1.auth.basic(config.db.user, config.db.password));
  var session = driver.session();


// DATABASE FUNCTIONS


function getNodeByAttribute(label, attribute){
  return function(search, cb) {
    var query = `MATCH (n:${label}) WHERE n.${attribute}=${search}`
    session.run(query)
      .then( result => {
        cb(result)
        session.close()
      })
      .catch(err=> {
        if (err) throw err;
      })
  }
}


var getProgramByTitle = getNodeByAttribute('Program', 'title');
var getOutcomeByName = getNodeByAttribute('Outcome', 'name');


var api = {
  getProgramByTitle: getProgramByTitle,
  getOutcomeByName: getOutcomeByName
}

  return {
    session: session,
    api: api
  }
}
