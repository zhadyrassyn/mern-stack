import {
  GET_PROFILE_POSTS_SUCCESS,
  GET_PROFILE_POSTS_ERROR,
  SAVE_PROFILE_POST_SUCCESS,
  SAVE_PROFILE_POST_ERROR,
  DELETE_PROFILE_POST_SUCCESS,
  DELETE_PROFILE_POST_ERROR,
  UPDATE_PROFILE_POST_SUCCESS,
  UPDATE_PROFILE_POST_ERROR
} from "../types/types";

const initialState = {
  posts: [],
  error: null,
};

export default (state=initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.data,
      };
    case GET_PROFILE_POSTS_ERROR:
      return {
        ...state,
        error: action.error
      };
    case SAVE_PROFILE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.concat([action.data])
      };
    case SAVE_PROFILE_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_PROFILE_POST_SUCCESS:
      const copyPosts = state.posts.slice();
      const index = copyPosts.findIndex(post => post._id === action.data._id);
      if (index >= 0) {
        copyPosts.splice(index, 1, action.data);
      }
      return {
        ...state,
        posts: copyPosts
      };
    case UPDATE_PROFILE_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    case DELETE_PROFILE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.data),
      };
    case DELETE_PROFILE_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

