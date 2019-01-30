var app = require('express').Router();
var Post = require('./../db/model/post');

app.get('/api/posts', function(request, response, next) {
  Post.find().then((posts) => {
    response.status(200).send({
      posts: posts
    });
  }).catch((error) => {
    console.log('error ', error);
    response.status(400).send();
  });
});

app.get('/api/posts/:postId', function(request, response) {
  var postId = request.params.postId;

  Post.findById(postId).then(function(post){
    if (post == null) {
      response.status(400).send();
    } else {
      response.send({
        post: post
      })
    }
  }).catch(function(error) {
    console.log(error);
    response.status(400).send();
  })
});

module.exports = app;