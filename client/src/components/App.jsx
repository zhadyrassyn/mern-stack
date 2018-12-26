import React from 'react';
import Header from './Header';
import Row from './Row';
import { fetchPosts } from "../actions/actions";
import { connect } from 'react-redux';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      now: new Date()
    }
  }

  // componentDidMount() {
  //   setInterval(
  //     () => {
  //       this.tick()
  //     }, 1000
  //   );
  // }
  //
  // tick() {
  //   this.setState({
  //     now: new Date()
  //   })
  // }

  componentDidMount() {
    console.log('this.props ', this.props);
    this.props.fetchPosts();
  }

  render() {
    const now = this.state.now.toLocaleTimeString();
    const posts = this.props.postsState.posts;

    return (
      <div>

        <Header/>
        <div>{ now }</div>
        <ul>
          {
            posts.map(function(post) {
              return <Row
                key={post._id}
                title={post.title}
                content={post.content}
                author={post.author}
              />
            })
          }
        </ul>
        App component
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    postsState: state.postsState
  }
};

export default connect(
  mapStateToProps,
  { fetchPosts: fetchPosts })(App);