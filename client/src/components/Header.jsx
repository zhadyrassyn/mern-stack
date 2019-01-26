import React, { Component } from 'react';

import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import {signout} from "../actions/actions";

import {withRouter} from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  handleSignOut() {
    this.props.signout(() => {
      this.props.history.push('/');
    });
  }

  render() {
    const authenticated = this.props.authenticated;
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink exact className="nav-link" to="/" activeClassName="active">Home <span className="sr-only">(current)</span></NavLink>
              </li>
              {!authenticated &&
                <li className="nav-item">
                  <NavLink exact className="nav-link" to="/signin" activeClassName="active">Sign in</NavLink>
                </li>
              }

              {!authenticated &&
                <li className="nav-item">
                  <NavLink exact className="nav-link" to="/signup" activeClassName="active">Sign up</NavLink>
                </li>
              }

              {authenticated &&
                <li className="nav-item">
                  <button className="nav-link signout-btn" onClick={this.handleSignOut.bind(this)}>Sign out</button>
                </li>
              }
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signout: (callback) => {
      dispatch(signout(callback));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));