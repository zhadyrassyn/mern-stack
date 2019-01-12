import React, { Component } from 'react';
import defaultPostImage from './../images/default-image.png';
import { Link } from 'react-router-dom';

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
    const image = this.props.image;
    const id = this.props._id;

    const postDetailLink = "/posts/" + id

    return (
      <li className="list-group-item">
        { image &&
          <img src={image} alt="Post image" className="d-block postImage"/>
        }
        {title}, {content}, {author}
        <button onClick={this.deletePost.bind(this)} className="btn btn-danger ml-2"><i className="fas fa-trash-alt"></i></button>
        <button onClick={this.editPost.bind(this)} className="btn btn-info ml-2"><i className="fas fa-edit"></i></button>
        <Link to={postDetailLink} className="btn btn-light ml-2"><i className="fas fa-arrow-right"></i></Link>
      </li>
    );
  }
}

export default Row;