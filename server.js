var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mern', function(error) {
  if (error) {
    console.log('error happened ', error);
    throw error;
  } else {
    console.log('connected to db succesfully');
  }
});

var app = express();

app.get('/', function(request, response) {
  response.send('Hello, world');
});

var port = 3000;
app.listen(port, function() {
  console.log('Server started on port: ' + port);
});