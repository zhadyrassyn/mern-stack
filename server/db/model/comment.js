const mongoose = require('./../mongoose');
const Schema = mongoose.Schema;

const Comment = mongoose.model('comment', {
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },

  createDate: {
    type: Date,
    default: new Date()
  },

  text: {
    type: String,
    required: true
  }
});

module.exports = Comment;