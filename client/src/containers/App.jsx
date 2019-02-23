import React from 'react';
import Row from './../components/Row';
import { connect } from 'react-redux';
import { fetchPosts} from "../actions/actions";

import './../styles/index.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      perPage: 3,
      currentPage: 1
    }
  }

  componentDidMount() {
    const perPage = this.state.perPage;
    const currentPage = this.state.currentPage;
    this.props.fetchPosts(perPage, currentPage);
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

  changePage = (title) => {
    const page = parseInt(title);

    const perPage = this.state.perPage;

    this.props.fetchPosts(perPage, page);

    this.setState({
      currentPage: page
    });
  };

  render() {
    const posts = this.props.posts;

    const perPage = this.state.perPage;
    const currentPage = this.state.currentPage;
    const total = this.props.total;

    const totalNumbers = Math.ceil(total / perPage);

    const pages = [];
    for (let i = 1; i <= totalNumbers; i++) {
      if (i === 1 || i === totalNumbers || i === currentPage) {
        pages.push({
          title: i
        });
      } else if ( currentPage - 2 <= i && currentPage + 2 >= i) {
        pages.push({
          title: i
        });
      }
    }

    return (
      <div className="px-2 py-2">
        <h3>Посты</h3>
        <ul className="list-group">
          { this.renderPosts(posts) }
        </ul>

        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" tabIndex="-1">Previous</a>
          </li>

          {pages.map(page => {
            const title = page.title;
            return (
            <li className={`page-item ${title === currentPage ? "active" : ""}`}>
              <a className="page-link active" onClick={this.changePage.bind(this, title)}>{page.title}</a>
            </li>
            )
          })}

          <li className="page-item">
            <a className="page-link">Next</a>
          </li>
        </ul>


      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
    total: state.posts.total,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (perPage, currentPage) =>
      dispatch(fetchPosts(perPage, currentPage)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);