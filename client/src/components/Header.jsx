import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const message = "It is header";

    return (
      <header>
        {message}
      </header>
    )
  }
}

export default Header;