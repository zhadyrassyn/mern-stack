import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  SAVE_COMMENT_SUCCESS,
  SAVE_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
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

    case SAVE_COMMENT_SUCCESS:
      return {
        ...state,
        fetchedPost: {
          ...state.fetchedPost,
          comments: state.fetchedPost.comments.concat(action.data)
        }
      };
    case SAVE_COMMENT_ERROR:
      return {
        ...state,
        error: action.message,
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        fetchedPost: {
          ...state.fetchedPost,
          comments: state.fetchedPost.comments.filter( comment => comment._id !== action.data._id )
        }
      };
    case DELETE_COMMENT_ERROR:
      return {
        ...state,
        error: action.message,
      };
    default:
      return state;
  }
};