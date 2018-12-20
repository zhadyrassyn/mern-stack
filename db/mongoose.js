var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mern', function(error) {
  if (error) {
    console.log('error happened ', error);
    process.exit();
  } else {
    console.log('connected to db succesfully');
  }
});

module.exports = mongoose;

