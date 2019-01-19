var app = require('express').Router();
var Post = require('./../db/model/post');
const multer = require('multer');
const path = require('path');
const base64Img = require('base64-img');
const fs = require('fs');

const uploadDir = path.join(__dirname, "../uploads");
const upload = multer({ dest: uploadDir });

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

app.post('/api/posts', upload.single('file'), function(request, response) {
  var requestBody = request.body;
  var title = requestBody.title;
  var content = requestBody.content;
  var author = requestBody.author;

  var savePost = {
    title,
    content,
    author
  };

  let filePath = '';
  // let filePath = request.file && request.file.path || "";
  try {
    filePath = request.file.path;
  }  catch(e) {
    console.log(e);
  }

  base64Img.base64(filePath, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      savePost.image = data;
    }

    if (filePath.length !== 0) {
      fs.unlink(filePath, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }

    var post = new Post(savePost);

    post.save().then((savedPost) => {
      response.send({
        savedPost: savedPost
      });
    }, (error) => {
      console.log(error);
      response.status(400).send();
    });
  });
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
  var requestBody = request.body;
  var title = requestBody.title;
  var content = requestBody.content;
  var author = requestBody.author;
  var postId = request.params.postId;

  Post.findByIdAndUpdate(postId, {$set: {
    title: title,
    content: content,
    author: author
  }}, {new: true})
  .then(function(updatedPost) {
    if (updatedPost == null) {
      response.status(400).send();
    } else {
      response.status(201).send({
        updatePost: updatedPost
      })
    }
  }).catch(function(error) {
    console.log(error);
    response.status(400).send({
      error: error
    });
  });
});


module.exports = app;