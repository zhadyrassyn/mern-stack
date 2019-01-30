const router = require('express').Router();
const multer = require('multer');
const base64Img = require('base64-img');
const fs = require('fs');
const path = require('path');

const Post = require('./../db/model/post');

const upload = multer({ dest: path.join(__dirname, '../uploads')});

const passport = require('./../service/passport');
const requireAuth = passport.authenticate('jwt', {session: false});


router.get('/api/profiles/:profileId/posts', requireAuth, async (req, res, next) => {

  try {
    const posts = await Post.find({ author: req.user._id });
    res.send({
      posts
    });
  } catch (e) {
    next(e)
  }
});

router.post('/api/profiles/:profileId/posts', requireAuth, upload.single('file'), (req, res, next) => {
  const {title, content } = req.body;

  const newPost = {
    title,
    content,
    author: req.user._id,
  };
  const filePath = req.file && req.file.path || '';

  base64Img.base64(filePath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      newPost.image = data;
    }

    if (filePath.length !== 0) {
      fs.unlink(filePath, function(err, data) {
        if (err) {
          console.log(err);
        }
      });
    }

    const savePost = new Post(newPost);
    savePost.save().then((savedPost) => {
      res.status(201).send({
        savedPost
      });
    }).catch((error) => {
      next(error);
    })
  });
});

router.put('/api/profiles/posts/:postId', requireAuth, async (req, res, next) => {
  const { title, content } = req.body;

  const postId = req.params.postId;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, {$set: {
      title,
      content
    }}, {new: true});

    res.send({
      updatedPost
    })
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

module.exports = router;