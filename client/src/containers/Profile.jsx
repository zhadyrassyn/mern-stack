import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  render() {
    return (
      <h1>Profile</h1>
    )
  }
}

export default Profile;