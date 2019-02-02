import React from 'react';

import { connect } from 'react-redux';

import { signin } from "../actions/actions";

import { withRouter } from 'react-router-dom';

import jwtDecode from 'jwt-decode';

class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    // const { email, password } = this.state;

    this.props.signin(email, password, () => {
      const decodedToken = jwtDecode(localStorage.getItem('token'));

      this.props.history.push(`/profile/${decodedToken.id}`);
    });
  }

  render() {
    const email = this.state.email;
    const password = this.state.password;

    return (
      <div className="signin-body">
        <form className="signin-form">
          <div className="signin-form-body">

            <h3 className="text-center">Sign in</h3>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input value={email} name="email" onChange={this.handleChange.bind(this)}
                     type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input value={password} name="password" onChange={this.handleChange.bind(this)}
                     type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
          </div>

          <button onClick={this.handleSubmit.bind(this)} type="submit" className="btn btn-primary signin-btn" >Submit</button>
        </form>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    signin: (email, password, success) => {
     dispatch(signin(email, password, success));
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Signin));