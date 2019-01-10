import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';

import { createStore, applyMiddleware } from 'redux';
import Reducers from './reducers/reducers';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';


const store = createStore(
  Reducers,
  applyMiddleware(thunkMiddleware, createLogger())
);

//JSX
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);