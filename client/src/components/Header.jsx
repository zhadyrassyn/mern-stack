import React, { Component } from 'react';

import { Link, NavLink } from 'react-router-dom';

import { connect } from 'react-redux';

import { signout, fetchPosts, changeSearchParams } from "../actions/actions";

import { withRouter } from 'react-router-dom';

import jwtDecode from 'jwt-decode';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    }
  }

  handleSignout() {
    this.props.signout(() => {
      this.props.history.push('/');
    });
  }

  handleInputChange(event) {
    this.setState({
      search: event.target.value,
    });
  }

  handleSearch(event) {
    event.preventDefault();

    const searchText = this.state.search;



    this.props.fetchPosts(this.props.perPage, 1, searchText, () => {
      this.props.changeSearchParams(1, searchText);
    });
  }

  render() {

    const authenticated = this.props.authenticated;
    let userId;

    if (authenticated) {
      const decodedToken = jwtDecode(localStorage.getItem('token'));

      userId = decodedToken.id;
    }

    const search = this.state.search;

    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

          <Link className="navbar-brand" to="/">Logo</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-container" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact activeClassName="active">Home <span className="sr-only">(current)</span></NavLink>
              </li>

              {!authenticated &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin" exact activeClassName="active">Sign in</NavLink>
              </li>
              }

              {!authenticated &&
              <li className="nav-item">
                <NavLink className="nav-link" to="/signup" exact activeClassName="active">Sign up</NavLink>
              </li>
              }

              {authenticated &&
              <li className="nav-item">
                <NavLink className="nav-link" to={`/profile/${userId}`} exact activeClassName="active">Profile</NavLink>
              </li>
              }

              {authenticated &&
                <li className="nav-item">
                  <button className="nav-link signout-btn" onClick={this.handleSignout.bind(this)}>Sign out</button>
                </li>
              }

            </ul>


            <form className="form-inline my-2 my-lg-0">
              <input value={search} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                onChange={this.handleInputChange.bind(this)}/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleSearch.bind(this)}>Search</button>
            </form>

          </div>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
    perPage: state.posts.perPage,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (perPage, currentPage, searchText, successCallback) =>
      dispatch(fetchPosts(perPage, currentPage, searchText, successCallback)),
    signout: (callback) => {
      dispatch(signout(callback));
    },
    changeSearchParams: (page, searchText) => {
      dispatch(changeSearchParams(page, searchText));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));