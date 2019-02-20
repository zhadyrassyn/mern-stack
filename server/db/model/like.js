const mongoose = require('./../mongoose');
const Schema = mongoose.Schema;

const Like = mongoose.model('like', {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  }
});

module.exports = Like;
