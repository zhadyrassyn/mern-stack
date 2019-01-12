import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './containers/App';
import PostDetail from './containers/PostDetail';

class Main extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/posts/:postId" component={PostDetail}/>
          <Route path="/" component={App} />
        </Switch>
      </div>
    )
  }
}

export default Main;