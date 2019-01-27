import { combineReducers } from 'redux';

import postReducer from './postReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  posts: postReducer,
  user: userReducer
});

export default reducers;

