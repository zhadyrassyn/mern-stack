
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchPost, saveComment, deleteComment} from "../actions/actions";
import defaultImg from './../images/default.jpg';
import { Link } from 'react-router-dom';
import defaultUserImage from './../images/defaultAva.png';
import jwtDecode from 'jwt-decode';



class PostDetail extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAddCommentForm: false,
      commentText: ''
    }
  }

  componentDidMount() {
    const postId = this.props.match.params.postId;
    this.props.fetchPost(postId);
  }

  showAddCommentFormEvent() {
    this.setState({
      showAddCommentForm: true
    })
  }

  closeAddCommentFormEvent() {
    this.setState({
      showAddCommentForm: false
    })
  }

  saveComment(event) {
    event.preventDefault();

    this.props.saveComment(this.props.fetchedPost._id, this.state.commentText, () => {
      this.setState({
        showAddCommentForm: false,
        commentText: ''
      })
    });
  }

  handleTextAreaChange(event) {
    this.setState({
      commentText: event.target.value
    })
  }

  handleDeleteComment(commentId) {
    this.props.deleteComment(this.props.fetchedPost._id, commentId);
  }

  render() {
    const post = this.props.fetchedPost;
    console.log('post ', post);
    const postImage = post && post.image ? post.image : defaultImg;
    const authenticated = this.props.authenticated;
    const showAddCommentForm = this.state.showAddCommentForm;
    const commentText = this.state.commentText;

    let userId;

    if (authenticated) {
      const decodedToken = jwtDecode(localStorage.getItem('token'));

      userId = decodedToken.id;
    }

    return (
      <div className="px-2 py-2">
        <Link to="/" className="btn btn-light"><i className="fas fa-arrow-left"></i></Link>
        {!post &&
        <p>Loading ...</p>
        }

        {post &&
        <div>
          <h1>{post.title}</h1>
          <img src={postImage} alt="Post image" className="d-block postDetailImage"/>

          <p className="mt-2">{post.content}</p>

          {post.author}

          { authenticated &&

          <div className="my-3">
            <button className="btn btn-success" onClick={this.showAddCommentFormEvent.bind(this)}>Add comment</button>

            {showAddCommentForm &&
            <form className="add-comment-form">
              <textarea placeholder="Your comment " className="form-control my-2" value={commentText}
                        onChange={this.handleTextAreaChange.bind(this)}/>
              <button className="btn btn-warning mr-2" onClick={this.closeAddCommentFormEvent.bind(this)}>Cancel</button>
              <button className="btn btn-primary" onClick={this.saveComment.bind(this)}>Save comment</button>
            </form>
            }
          </div>

          }


          {post.comments.length > 0 && <h3>Comments:</h3>}
          <ul className="list-group">
            {post.comments.map(comment => {
              return (
                <li
                  key={comment._id}
                  className="list-group-item">
                  <p className="comment">
                    {comment.user.avaPath && <img src={"http://localhost:3001" + comment.user.avaPath}/> }
                    { !comment.user.avaPath && <img src={defaultUserImage} /> }
                    {comment.user.firstName} ,
                    {comment.user.lastName}
                  </p>
                  {comment.text}

                  {comment.user._id === userId &&
                    <button type="button" className="btn btn-danger d-block" onClick={this.handleDeleteComment.bind(this, comment._id)}>
                      <i className="fas fa-trash-alt"/>
                    </button>
                  }
                </li>
              )
            })}
          </ul>

        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetchedPost: state.posts.fetchedPost,
    authenticated: state.user.authenticated,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (postId) => {
      dispatch(fetchPost(postId))
    },
    saveComment: (postId, commentText, successCallback) => {
      dispatch(saveComment(postId, commentText, successCallback))
    },
    deleteComment: (postId, commentId) => {
      dispatch(deleteComment(postId, commentId))
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);