import { combineReducers } from 'redux';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  SAVE_POST_SUCCESS,
  SAVE_POST_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR
} from "../types/types";

const initialState = {
  posts: [],
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.data
      };
    case FETCH_POSTS_ERROR:
      return {
        ...state,
        error: action.error
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.concat([action.data])
      };
    case SAVE_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    case EDIT_POST_SUCCESS:
      const copyPosts = state.posts.slice();
      const index = copyPosts.findIndex(post => post._id === action.data._id);
      if (index >= 0) {
        copyPosts.splice(index, 1, action.data);
      }
      return {
        ...state,
        posts: copyPosts
      };
    case EDIT_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.data),
      };
    case DELETE_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  posts
});

export default reducers;

