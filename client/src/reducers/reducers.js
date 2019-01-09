import { combineReducers } from 'redux';

import {
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_PROCESSING, SAVE_POST_SUCCESS, SAVE_POST_FAILURE,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE
} from "../types/types";


const initialState = {
  posts: [],
  processing: false,
  error: '',
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_PROCESSING:
      return {
        ...initialState,
        processing: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...initialState,
        posts: action.data,
        processing: false,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...initialState,
        processing: false,
        error: action.message
      };

    case SAVE_POST_SUCCESS:
      return {
        ...initialState,
        posts: state.posts.concat([action.data])
      };
    case SAVE_POST_FAILURE:
      return {
        ...initialState,
        error: action.message,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...initialState,
        posts: state.posts.filter((post) => post._id !== action.data._id),
      };
    case DELETE_POST_FAILURE:
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

    case UPDATE_POST_FAILURE:
      return {
        ...initialState,
        error: action.message,
      };
    default:
      return state;

  }
};

const reducers = combineReducers({
  posts: posts
});

export default reducers;