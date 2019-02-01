const router = require('express').Router();
const Post = require('./../db/model/post');

const multer = require('multer');
const path = require('path');
const base64Img = require('base64-img');
const fs = require('fs');

const uploadDir = path.join(__dirname, "../uploads");
const upload = multer({ dest: uploadDir });

const passport = require('./../service/passport');
const requireAuth = passport.authenticate('jwt', {session: false});

router.get('/api/profiles/posts', requireAuth, async (req, res, next) => {
  try {
    const posts = await Post.find({ author: req.user._id });

    res.send({
      posts
    });
  } catch (e) {
    next(e);
  }
});

router.delete('/api/profiles/posts/:postId', requireAuth, async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    res.send({
      deletedPost
    });
  } catch (e) {
    next(e);
  }
});

router.post('/api/profiles/posts', requireAuth, upload.single('file'), (request, response, next) => {
  var requestBody = request.body;
  var title = requestBody.title;
  var content = requestBody.content;
  var author = request.user._id;

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
      next(error);
    });
  });
});

//Обновление поста пользователя

//Получить пост пользователя по id



module.exports = router;
