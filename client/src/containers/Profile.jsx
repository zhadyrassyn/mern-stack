import React from 'react';

import { connect } from 'react-redux';

import { getProfilePosts } from "../actions/actions";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.props.getProfilePosts(() => {

    }, () => {

    })
  }

  componentDidMount() {
    console.log('123 ?');
  }

  render() {
    console.log(this.props.posts);

    return (
      <h1>Profile page</h1>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.profile.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfilePosts: () =>
      dispatch(getProfilePosts()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);