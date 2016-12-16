const express = require('express');
const path = require('path');
const fs = require('fs');
const neo4j = require('neo4j-driver');
const bodyParser = require('body-parser');

require('dotenv').config();

var env = process.env.NODE_ENV || 'dev';
const config = require('./config/config')[env]
console.log('Using configuration', env);

var db = require('./config/db')(config, neo4j);

var app = express();

app.set('port', config.app.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app, config, db, express)

app.listen(app.get('port'), ()=>{
  console.log(`Listening on ${app.get('port')}`);
})
