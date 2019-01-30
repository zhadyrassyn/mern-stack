var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mern', { useNewUrlParser: true }, function(error) {
  console.log('inside');
  if (error) {
    console.log('error happened ', error);
    process.exit();
  } else {
    console.log('connected to db succesfully');
  }
});

module.exports = mongoose;

