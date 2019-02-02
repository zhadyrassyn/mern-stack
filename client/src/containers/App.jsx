import React from 'react';
import Row from './../components/Row';
import { connect } from 'react-redux';
import { fetchPosts} from "../actions/actions";

import './../styles/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts = (posts) => {
    return posts.map((post) => {
      return <Row
        key={post._id}
        title={post.title}
        content={post.content}
        author={post.author}
        image={post.image}
        _id={post._id}
        authenticated={false}
      />
    })
  };

  render() {
    const posts = this.props.posts;
    console.log('posts ', posts);

    return (
      <div className="px-2 py-2">
        <h3>Посты</h3>
        <ul className="list-group">
          { this.renderPosts(posts) }
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () =>
      dispatch(fetchPosts()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);