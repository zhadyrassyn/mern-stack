const router = require('express').Router();

const passport = require('./../service/passport');
const requireAuth = passport.authenticate('jwt', {session: false});
const Like = require('./../db/model/like');

router.post('/api/posts/:postId/likes', requireAuth, async (req, res, next) => {
  const user = req.user;
  const postId = req.params.postId;

  try {
    const like = new Like({
      user: user._id,
      post: postId,
    });

    const savedLike = await like.save();

    res.status(201).send({
      savedLike: savedLike
    });
  } catch(e) {
    next(e);
  }
});

router.delete('/api/posts/:postId/likes', requireAuth, async (req, res, next) => {
  const user = req.user;
  const postId = req.params.postId;

  try {
    const deletedLike = await Like.findOneAndRemove({
      user: user._id,
      post: postId
    });

    res.send({
      deletedLike: deletedLike
    });
  } catch(e) {
    next(e);
  }
});

router.get('/api/posts/:postId/likes', requireAuth, async (req, res, next) => {
  const user = req.user;
  const postId = req.params.postId;

  try {
    const likesAmount = await Like.count({
      user: user._id,
      post: postId
    });
    
    const liked = likesAmount === 1;

    res.send({
      liked
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
