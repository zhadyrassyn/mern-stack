import React, { Component } from 'react';

class Row extends Component {
  constructor(props) {
    super(props);
  }

  deletePost() {
    const id = this.props._id;
    console.log('delete id ', id);
    this.props.handleDelete(id);
  }

  editPost() {

  }

  render() {
    const title = this.props.title;
    const author = this.props.author;
    const content = this.props.content;

    return (
      <li>{title}, {content}, {author}
        <button onClick={this.deletePost.bind(this)}>Delete post</button>
        <button onClick={this.editPost.bind(this)}>Edit post</button>
      </li>
    );
  }
}

export default Row;