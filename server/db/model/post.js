const mongoose = require('./../mongoose');
const Schema = mongoose.Schema;

const Post = mongoose.model('Post', {
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  image: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
});

module.exports = Post;
