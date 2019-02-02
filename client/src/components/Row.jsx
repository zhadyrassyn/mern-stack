import React, { Component } from 'react';
import defaultImg from './../images/default.jpg';

import { Link } from "react-router-dom";

class Row extends Component {
  constructor(props) {
    super(props);
  }

  deletePost() {
    const id = this.props._id;
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
    const image = this.props.image || defaultImg;
    const link = '/detail/' + this.props._id;
    const authenticated = this.props.authenticated;

    return (
      <li className="list-group-item">
        <div className="mb-2">

          <img src={image} alt="Картинка поста" className="post-image"/>
        </div>
        {title}, {content}, {author}

        {authenticated &&
          <div>
            <button onClick={this.deletePost.bind(this)} className="btn btn-danger ml-2"><i className="fas fa-trash-alt"/></button>
            <button onClick={this.editPost.bind(this)} className="btn btn-info ml-2"><i className="fas fa-edit"/></button>
          </div>
        }

        {!authenticated &&
        <Link to={link} className="btn btn-light ml-2"><i className="fas fa-chevron-right"/></Link>
        }

      </li>
    );
  }
}

export default Row;