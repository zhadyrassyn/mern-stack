import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR
} from "../types/types";
import axios from 'axios';

// function fetchPosts() {
//   return function(dispatch, getState) {
//
//   }
// }

export const fetchPosts = () => (dispatch, getState) => {

  axios('http://localhost:3001/api/posts')
    .then((success) => {
      dispatch({
        type: FETCH_POSTS_SUCCESS,
        data: success.data.posts
      })
    })
    .catch(function(error) {
      console.log(error);
      dispatch({
        type: FETCH_POSTS_ERROR,
        error: error.message || "ERROR HAPPENED"
      })
    })
};
