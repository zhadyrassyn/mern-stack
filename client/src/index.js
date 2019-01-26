import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';

import { createStore, applyMiddleware } from 'redux';
import Reducers from './reducers/reducers';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { BrowserRouter } from "react-router-dom";

import {
  SIGN_IN_SUCCESS,
} from "./types/types";

import axios from 'axios';

const store = createStore(
  Reducers,
  applyMiddleware(thunkMiddleware, createLogger())
);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({
    type: SIGN_IN_SUCCESS,
  })
}

axios.get('http://localhost:3001/api/secret', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
  .then((success) => {
    console.log('success ', success);
  }).catch((error) => {
    console.log(error.response);
});

//JSX
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);