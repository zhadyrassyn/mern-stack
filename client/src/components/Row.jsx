import React, { Component } from 'react';

class Row extends Component {
  render() {
    const title = this.props.title;
    const author = this.props.author;
    const content = this.props.content;

    return (
      <li>{title}, {content}, {author}</li>
    );
  }
}

export default Row;