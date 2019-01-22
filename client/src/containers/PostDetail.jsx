
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchPost} from "../actions/actions";
import defaultImg from './../images/default.jpg';
import { Link } from 'react-router-dom';

class PostDetail extends Component {

  componentDidMount() {
    const postId = this.props.match.params.postId;
    this.props.fetchPost(postId);
  }

  render() {
    const post = this.props.fetchedPost;
    const postImage = post && post.image ? post.image : defaultImg;

    return (
      <div>
        <Link to="/" className="btn btn-light"><i className="fas fa-arrow-left"></i></Link>
        {!post &&
        <p>Loading ...</p>
        }
        {post &&
        <div>
          <img src={postImage} alt="Post image" className="d-block"/>
          {post.title}, {post.content}, {post.author}
        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetchedPost: state.posts.fetchedPost
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (postId) => {
      dispatch(fetchPost(postId))
    },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);