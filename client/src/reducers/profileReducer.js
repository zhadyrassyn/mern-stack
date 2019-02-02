import {
  GET_PROFILE_POSTS_SUCCESS,
  GET_PROFILE_POSTS_ERROR
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
    default:
      return state;
  }
};

