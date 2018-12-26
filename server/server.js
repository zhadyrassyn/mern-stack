var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var mongoose = require('./db/mongoose');
var postRoute = require('./route/postRoute');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', postRoute);

var port = 3001;
app.listen(port, function() {
  console.log('Server started on port: ' + port);
});