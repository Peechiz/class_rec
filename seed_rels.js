// script to add relationships to dummy data

const neo4j = require('neo4j-driver');
const config = require('./config/config')['dev']

var driver = neo4j.v1.driver('bolt://localhost', neo4j.v1.auth.basic('neo4j', 'cji1859'));


var session = driver.session();

var class_names = [];

session
.run('MATCH (c:Class) RETURN c')
.then(res => {
  console.log(res.records.length + ' classes found');
  // console.log(res.records[0]._fields[0].properties.name);
  res.records.forEach(rec=>{
    class_names.push(rec._fields[0].properties.name)
  })
  session.close();
})
.catch(err=>{
  console.log(err);
})
.then(()=>{

  var i = 0;

  function loop() {
    console.log('running ' + class_names[i]);
    var name = class_names[i]
    session
    .run(`MATCH (s:Student) WHERE rand()<=.25
               WITH s
               MATCH (c:Class {name: "${name}"})
               CREATE (s)-[:Enrolled]->(c)`)
    .then(()=>{
      session.close();
      i++;
      if (i<class_names.length){
        loop();
      }
    })
    .catch(err => {
      console.log(err);
    })
  }
  loop();

})
