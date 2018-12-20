var app = require('express').Router();
var Post = require('./../db/model/post');

// Вытащить все посты
// localhost:3000/api/posts
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

app.post('/api/posts', function(request, response) {
  var requestBody = request.body;
  var title = requestBody.title;
  var content = requestBody.content;
  var author = requestBody.author;

  var savePost = {
    title,
    content,
    author
  };

  var post = new Post(savePost);

  post.save().then((savedPost) => {
    response.send({
      savedPost: savedPost
    });
  }, (error) => {
    console.log(error);
    response.status(400).send();
  })

});

// Вытащить элеметы по ID
// localhost:3000/api/posts/dgd3523534
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


// Удалить элемент по ID
app.delete('/api/posts/:postId', function(request, response) {
  var postId = request.params.postId;

  Post.findByIdAndDelete(postId).then((deletedPost) => {
    if (!deletedPost) {
      return response.status(400).send();
    }

    response.status(200).send({
      deletedPost
    })

  }).catch((e) => {
    console.log('Ошибка ', e);
    console.log(e);
  });
});

//Обновление поста
app.put('/api/posts/:postId', function(request, response) {
  //TODO ДОПИСАТЬ МЕТОД . Похоже на app.post('/api/posts')
});


module.exports = app;