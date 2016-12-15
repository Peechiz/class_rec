// *** LABELS ***
// INSTITUTION -- PROGRAM -- OFFERING -- OUTCOME -- PERSON
// **************

// *** RELATIONSHIPS ***
// COMPLETED -- DESIGNS -- ENROLLED -- FULFILLS -- PROVIDES -- REQUIRES
// *********************



function getNodeByAttribute(label, attribute){
  return function(search) {
    var query = `MATCH (n:${label}) WHERE n.${attribute}=${search}`
    return query;
  }
}

function createNodeWithAttr(label) {
  return function(attr_map){
    var attrs = '';
    Object.keys(attr_map).forEach( key => {
      attrs += `n.${key}=${attr_map[key]}`
    })
    var query = `CREATE (n:${label} {${attrs}})`
    return query;
  }
}

function deleteNodeByAttribute(label,attribute) {
  return function(search) {
    var query = `MATCH (n:${label}) WHERE n.${attribute}=${search} DETACH DELETE n`
    return query;
  }
}


function withOneAttr(label, attr_map, _var){
  var attr = Object.keys[0];
  var val = attr_map[attr];

  var query = `MATCH (${_var}:${label}) WHERE ${_var}.${attr}=${val}`;
  return query;
}

function createRelationship(label1, attr_map1, label2, attr_map2, type) {
  // MATCH (x:LABEL1)
  // WHERE x.PROP1 = VAL1
  // WITH x
  // MATCH (y:LABEL2)
  // WHERE y.PROP2 = VAL2
  // CREATE (x)-[:${type}]->(y)

  var q1 = withOneAttr(label1, attr_map1, 'x') + 'WITH x';
  var q2 = withOneAttr(label2, attr_map2, 'y');

  var query = q1 + q2 + `CREATE (x)-[:${type}]->(y)`
  return query;
}



var api = {

  rel: {
    make: createRelationship
  },

  get: {
    ProgramByTitle : getNodeByAttribute('Program', 'title'),
    OutcomeByName : getNodeByAttribute('Outcome', 'name'),
    InstitutionByName : getNodeByAttribute('Institution', 'name'),
    OfferingByName : getNodeByAttribute('Offering', 'name'),
    PersonByName : getNodeByAttribute('Person', 'name')
  },

  create: {
    Institution : createNodeWithAttr('Institution'),
    Program : createNodeWithAttr('Program'),
    Outcome : createNodeWithAttr('Outcome'),
    Offering : createNodeWithAttr('Offering'),
    Person : createNodeWithAttr('Person')
  },

  delete: {
    ProgramByTitle : deleteNodeByAttribute('Program', 'title'),
    OutcomeByName : deleteNodeByAttribute('Outcome', 'name'),
    InstitutionByName : deleteNodeByAttribute('Institution', 'name'),
    OfferingByName : deleteNodeByAttribute('Offering', 'name'),
    PersonByName : deleteNodeByAttribute('Person', 'name')
  },
}

module.exports = api;
