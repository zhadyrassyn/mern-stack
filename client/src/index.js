import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducers from './reducers/reducers';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const store = createStore(
  reducers,
  applyMiddleware(reduxThunk, createLogger())
);

//JSX
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);