import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT,
} from "../types/types";

const initialState = {
  authenticated: false,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        authenticated: false,
      };
    case SIGN_OUT:
      return {
        ...state,
        authenticated: false,
      };
    default:
      return state;
  }
}