import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNOUT
} from "../types/types";

const initialState = {
  authenticated: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        authenticated: false
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        authenticated: false
      };
    case SIGNOUT:
      return {
        ...state,
        authenticated: false
      };
    default:
      return state;
  }
};