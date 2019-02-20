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
  },
  avaPath: String
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

userSchema.methods.compare = function(plainPassword, callback) {
  var user = this;

  bcrypt.compare(plainPassword, user.password, function(error, equal) {
    if (error) {
      callback(error);
    } else {
      callback(null, equal);
    }
  });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
