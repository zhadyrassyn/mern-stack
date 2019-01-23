import React, { Component } from 'react';
import App from './containers/App';
import PostDetail from './containers/PostDetail';

import { Route, Switch, Redirect } from "react-router-dom";

import Secret from './components/Secret';

class Main extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/detail/:postId" component={PostDetail}/>
          <PrivateRoute path="/secret" component={Secret}/>
          <Route path="/" component={App}/>
        </Switch>
      </div>
    )
  }
}

function PrivateRoute({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('user') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default Main;