var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');

var mongoose = require('./db/mongoose');
var postRoute = require('./route/postRoute');
const authRoute = require('./route/authRoute');
const profileRoute = require('./route/profileRoute');
const commentRoute = require('./route/commentRoute');
const likeRoute = require('./route/likeRoute');
const path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, "uploads")));

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use('/', postRoute);
app.use('/', authRoute);
app.use('/', profileRoute);
app.use('/', commentRoute);
app.use('/', likeRoute);

function handleError(err, req, res, next) {
  console.log(err);
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