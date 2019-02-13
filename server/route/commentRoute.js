const router = require('express').Router();

const passport = require('./../service/passport');
const requireAuth = passport.authenticate('jwt', {session: false});

const Post = require('./../db/model/post');
const Comment = require('./../db/model/comment');

router.post('/api/posts/:postId/comments', requireAuth,
  async (req, res, next) => {

  const user = req.user;
  const postId = req.params.postId;
  const commentText = req.body.comment;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      res.status(404).send({
        error: 'Post with id ' + postId + ' does not exist'
      });
    }

    

  } catch (e) {
    next(e);
  }


});

module.exports = router;