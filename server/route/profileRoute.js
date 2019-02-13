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

const User = require('./../db/model/user');

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
router.put('/api/profiles/posts/:postId', requireAuth, upload.single('file'), async (req, res, next) => {
  const {title, content} = req.body;
  const postId = req.params.postId;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, {$set: {
      title,
      content,
    }}, {new: true});

    res.status(201).send({
      updatePost: updatedPost
    });
  } catch (e) {
    next(e);
  }
});

//Получить пост пользователя по id
router.get('/api/profiles/posts/:postId', requireAuth, async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    res.send({
      post,
    });
  } catch (e) {
    next(e);
  }

});

router.post('/api/profiles/ava', requireAuth, upload.single('file'),
  (req, res, next) => {
      const id = req.user._id;
      const filePath = req.file.path;

      const fileExtension = req.file.originalname.split('.').pop();
      const targetFile = id + '.' + fileExtension;
      const targetPath = path.join(uploadDir, "avas", targetFile);

      fs.rename(filePath, targetPath, function(err) {
        if (err) next(err);

        User.findById(id).then((user) => {
          const previousAvaPath = user.avaPath;

          user.avaPath = "/avas/" + targetFile;

          user.save().then((updatedUser) => {

            if (previousAvaPath && !previousAvaPath.endsWith(fileExtension)) {
              fs.unlink(previousAvaPath, function(err) {
                if (err) {
                  console.log(err);
                }
              });
            }

            res.send({
              updatedUser
            });

          }).catch((error) => {
            next(error);
          });
        }).catch((error) => next(error));
      });
});

router.post('/api/profiles/ava/v1', requireAuth, upload.single('file'), function(req, res, next) {
  const id = req.user._id;
  const filePath = req.file.path;

  const fileExtension = req.file.originalname.split('.').pop();
  const targetFile = id + '.' + req.file.originalname.split('.').pop();
  const targetPath = path.join(uploadDir, "avas", targetFile);

  fs.rename(filePath, targetPath, function(err) {
    if (err) next(err);


    User.findById(id).then((user) => {
      const previousAvaPath = user.avaPath;

      user.avaPath = "/avas/" + targetFile;

      ///
      user.save().then((updatedUser) => {

        if (previousAvaPath && !previousAvaPath.endsWith(fileExtension)) {
          fs.unlink(previousAvaPath, function(err) {
            if (err) {
              console.log(err);
            }
          });

        }

        res.send({
          id,
          filePath
        })


      }).catch((error) => {
        next(error);
      });

      ///

      }).catch((error) => {
        next(error);
      });
    });

});


router.get('/api/profile', requireAuth, (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId).then((user) => {
    res.send({
      avaPath: user.avaPath,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }).catch((error) => next(error))
});


module.exports = router;
