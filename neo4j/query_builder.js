// *** LABELS ***
// INSTITUTION -- PROGRAM -- OFFERING -- OUTCOME -- PERSON
// **************

// *** RELATIONSHIPS ***
// COMPLETED -- DESIGNS -- ENROLLED -- FULFILLS -- PROVIDES -- REQUIRES
// *********************



function getNodeByAttribute(label, attribute){

  // pass null to data_return to cancel return statement
  // (to be used with SET method)
  return function(search, data_return) {
    var query = `MATCH (n:${label}) WHERE n.${attribute}='${search}'`
    if (data_return !== null){
      query += ' RETURN n'
    }
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

function set(attr_map) {
  if (typeof(attr_map) != 'object') {
    return
  }
  if (Object.keys(attr_map).length === 1){
    var attr = Object.keys(attr_map)[0];
    var val = attr_map[attr];
    if (typeof(val) == 'string'){
      return `SET n.${attr}="${val}"`;
    } else {
      return `SET n.${attr}=${val}`
    }
  } else {
    var commands = [];
    Object.keys(attr_map).forEach( key => {
      var val = attr_map[key];
      if (typeof(val)== 'string'){
        commands.push(`n.${key}="${val}"`)
      } else {
        commands.push(`n.${key}=${val}`)
      }
    })
    return 'SET ' + commands.join(', ')
  }
}


var api = {

  rel: {
    make: createRelationship
  },

  get: {
    programByTitle : getNodeByAttribute('Program', 'title'),
    outcomeByName : getNodeByAttribute('Outcome', 'name'),
    institutionByName : getNodeByAttribute('Institution', 'name'),
    offeringByName : getNodeByAttribute('Offering', 'name'),
    personByName : getNodeByAttribute('Person', 'name')
  },

  create: {
    institution : createNodeWithAttr('Institution'),
    program : createNodeWithAttr('Program'),
    outcome : createNodeWithAttr('Outcome'),
    offering : createNodeWithAttr('Offering'),
    person : createNodeWithAttr('Person')
  },

  delete: {
    programByTitle : deleteNodeByAttribute('Program', 'title'),
    outcomeByName : deleteNodeByAttribute('Outcome', 'name'),
    institutionByName : deleteNodeByAttribute('Institution', 'name'),
    offeringByName : deleteNodeByAttribute('Offering', 'name'),
    personByName : deleteNodeByAttribute('Person', 'name')
  },

  set: set,
}

module.exports = api;
