var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('./db/mongoose');
var postRoute = require('./route/postRoute');

var app = express();
app.use(bodyParser.json());
app.use('/', postRoute);

var port = 3000;
app.listen(port, function() {
  console.log('Server started on port: ' + port);
});