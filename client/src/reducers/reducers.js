import { combineReducers } from 'redux';

import postReducer from './postReducer';
import userReducer from './userReducer';
import profileReducer from './profileReducer';

const reducers = combineReducers({
  posts: postReducer,
  user: userReducer,
  profile: profileReducer
});

export default reducers;

