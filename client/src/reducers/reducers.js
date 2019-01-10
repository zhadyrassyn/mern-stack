import { combineReducers } from 'redux';
import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
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

    default:
      return state;
  }
};

const reducers = combineReducers({
  posts
});

export default reducers;

