import React, { Component } from 'react';
import App from './containers/App';
import PostDetail from './containers/PostDetail';
import Signin from './components/Signin';
import Signup from './components/Signup';

import { Route, Switch } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/detail/:postId" component={PostDetail}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/" component={App}/>
        </Switch>
      </div>
    )
  }
}

export default Main;