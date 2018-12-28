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
    const id = this.props._id;
    const author = this.props.author;
    const title = this.props.title;
    const content = this.props.content;

    this.props.handleEdit(id, author, title, content);
  }

  render() {
    const title = this.props.title;
    const author = this.props.author;
    const content = this.props.content;

    return (
      <li className="list-group-item">{title}, {content}, {author}
        <button onClick={this.deletePost.bind(this)} className="btn btn-danger ml-2"><i className="fas fa-trash-alt"></i></button>
        <button onClick={this.editPost.bind(this)} className="btn btn-info ml-2"><i className="fas fa-edit"></i></button>
      </li>
    );
  }
}

export default Row;