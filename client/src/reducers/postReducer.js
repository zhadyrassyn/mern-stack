import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR
} from "../types/types";

const initialState = {
  posts: [],
  fetchedPost: null
};

export default (state = initialState, action) => {
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
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        fetchedPost: action.data,
      };
    case FETCH_POST_ERROR:
      return {
        ...state,
        error: action.message,
      };
    default:
      return state;
  }
};