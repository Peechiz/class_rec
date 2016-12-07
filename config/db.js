module.exports = function (config, neo4j) {
  var driver = neo4j.v1.driver(config.db.address, neo4j.v1.auth.basic(config.db.user, config.db.password));

  var session = driver.session();

  return session();
}
