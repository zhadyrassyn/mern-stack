import { combineReducers } from 'redux';
import posts from './postsReducer';

export default combineReducers({
  postsState: posts
})