var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var mongoose = require('./db/mongoose');
var postRoute = require('./route/postRoute');
const authRoute = require('./route/authRoute');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/', postRoute);
app.use('/', authRoute);

// Middleware error handler for json response
function handleError(err,req,res,next){
  var statusCode = err.status || 500;

  var output = {
    error: {
      name: err.name,
      message: err.message,
      text: err.toString(),
      statusCode: statusCode
    }
  };

  res.status(statusCode).json(output);
}

app.use(handleError);

var port = 3001;
app.listen(port, function() {
  console.log('Server started on port: ' + port);
});