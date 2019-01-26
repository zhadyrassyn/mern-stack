const bcrypt = require('bcrypt-nodejs');
const mongoose = require('./../mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

userSchema.pre('save', function(next) {
  var user = this;
  bcrypt.genSalt(10, function(error, result) {
    if (error) {
      next(error);
    } else {
      bcrypt.hash(user.password, result, null, function(error, hashedPassword) {
        if (error) {
          next(error);
        } else {
          user.password = hashedPassword;
          next();
        }
      })
    }
  })
});

userSchema.methods.compare = function(userPassword, callback) {
  var user = this;
  bcrypt.compare(userPassword, user.password, function(error, equal) {
    if (error) {
      callback(error);
    } else if (equal == false) {
      callback(null, false);
    } else {
      callback(null, true);
    }
  });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
