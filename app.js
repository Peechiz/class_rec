const express = require('express');
const path = require('path');
const fs = require('fs');
const neo4j = require('neo4j-driver');

require('dotenv').config();

var env = process.env.NODE_ENV || 'dev';
const config = require('./config/config')[env]
console.log('Using configuration', config);

var db = require('./config/db')(config, neo4j);

var app = express();

app.set('port', config.app.port);
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app, config, db)

app.listen(app.get('port'), ()=>{
  console.log(`Listening on ${app.get('port')}`);
})
