import { combineReducers } from 'redux';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  SAVE_POST_SUCCESS,
  SAVE_POST_ERROR,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR
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
        ...initialState,
        posts: state.posts.concat([action.data])
      };
    case SAVE_POST_ERROR:
      return {
        ...initialState,
        error: action.message,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...initialState,
        posts: state.posts.filter((post) => post._id !== action.data._id),
      };
    case DELETE_POST_ERROR:
      return {
        ...initialState,
        error: action.message,
      };
    case UPDATE_POST_SUCCESS:
      const currentPosts = state.posts.slice();
      const index = currentPosts.findIndex(post => post._id === action.data._id);
      if (index >= 0) {
        currentPosts.splice(index, 1, action.data);
      }
      return {
        ...initialState,
        posts: currentPosts
      };

    case UPDATE_POST_ERROR:
      return {
        ...initialState,
        error: action.message,
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  posts
});

export default reducers;

