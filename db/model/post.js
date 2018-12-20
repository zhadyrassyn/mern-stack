const mongoose = require('./../mongoose');

const Post = mongoose.model('Post', {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  author: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = Post;
