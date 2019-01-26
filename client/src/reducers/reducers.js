import { combineReducers } from 'redux';
import postReducers from './postReducers';
import userReducers from './userReducers';

const reducers = combineReducers({
  posts: postReducers,
  user: userReducers,
});

export default reducers;

