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

    const comment = new Comment({
      user: user._id,
      post: post._id,
      text: commentText
    });

    try {
      let savedComment = await comment.save();
      savedComment = savedComment.toObject();
      savedComment.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        avaPath: user.avaPath,
        _id: user._id
      };

      post.comments.push(savedComment._id);

      const savedPost = await post.save();

      res.status(201).send({
        savedComment: savedComment,
      });

    } catch (e) {
      next(e);
    }

  } catch (e) {
    next(e);
  }
});

router.delete('/api/posts/:postId/comments/:commentId',
  requireAuth, async (req, res, next) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const user = req.user;

    try {
      const post = await Post.findById(postId);
      post.comments = post.comments.filter(comment => commentId != comment);
      const savedPost = await post.save();

      const deletedComment = await Comment.findByIdAndDelete(commentId);

      res.send({
        deletedComment: deletedComment
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;