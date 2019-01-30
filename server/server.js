var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var mongoose = require('./db/mongoose');
var postRoute = require('./route/postRoute');
const authRoute = require('./route/authRoute');
const profileRoute = require('./route/profileRoute');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', postRoute);
app.use('/', authRoute);
app.use('/', profileRoute);

function handleError(err, req, res, next) {
  const statusCode = err.status || 500;
  const errorResponse = {
    name: err.name,
    message: err.message,
    text: err.toString(),
    statusCode
  };

  res.status(statusCode).json(errorResponse);
}

app.use(handleError);

var port = 3001;
app.listen(port, function() {
  console.log('Server started on port: ' + port);
});