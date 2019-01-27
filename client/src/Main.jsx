import React, { Component } from 'react';
import App from './containers/App';
import PostDetail from './containers/PostDetail';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Header from './components/Header';

import { Route, Switch } from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <div>
        <Header/>
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