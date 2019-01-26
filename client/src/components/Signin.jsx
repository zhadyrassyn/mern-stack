import React from 'react';
import Header from './../components/Header';
import { connect } from 'react-redux';
import {signin} from "../actions/actions";

import { withRouter } from 'react-router-dom'

class Signin extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signin(email, password, () => {
      this.props.history.push('/');
    }, () => {
      this.setState({
        error: 'Email or password is not defined',
      })
    });
  }

  render() {
    const {email, password, error} = this.state;

    return (
      <div className="signin-body">
        <form className="signin-form">
          <div className="signin-form-body">
            <h3 className="text-center">Sign in</h3>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" value={email} onChange={this.handleChange.bind(this)} name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" value={password} className="form-control" onChange={this.handleChange.bind(this)} name="password" id="password" placeholder="Password"/>
            </div>
            <p className="text-danger">{error}</p>
          </div>
          <button type="submit" className="btn btn-primary signin-btn" onClick={this.handleSubmit.bind(this)}>Sign in</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (email, password, success, error) => {
      dispatch(signin(email, password, success, error));
    }
  }
};

export default withRouter(connect(null, mapDispatchToProps)(Signin));