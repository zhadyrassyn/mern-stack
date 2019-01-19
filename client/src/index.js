import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';

import { createStore, applyMiddleware } from 'redux';
import Reducers from './reducers/reducers';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { BrowserRouter } from "react-router-dom";

const store = createStore(
  Reducers,
  applyMiddleware(thunkMiddleware, createLogger())
);

//JSX
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);