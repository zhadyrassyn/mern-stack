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

import axios from 'axios';

export const fetchPosts = () => (dispatch, getState) => {
  axios('http://localhost:3001/api/posts')
    .then((success) => {
      dispatch({
        type: FETCH_POSTS_SUCCESS,
        data: success.data.posts
      })
    })
    .catch(function(error) {
      dispatch({
        type: FETCH_POSTS_ERROR,
        error: error.message || "ERROR HAPPENED"
      })
    })
};

export const savePost = (post, successCallback) => (dispatch, getState) => {
  axios.post('http://localhost:3001/api/posts', post)
    .then((success) => {
      if (success.status === 200) {
        dispatch({
          type: SAVE_POST_SUCCESS,
          data: success.data.savedPost,
        });

        successCallback();
      }
    })
    .catch((error) => {
      dispatch({
        type: SAVE_POST_ERROR,
        message: error.message || "ERROR HAPPENED",
      });
    });
};

export const deletePost = (id) => (dispatch, getState) => {

  axios.delete('http://localhost:3001/api/posts/' + id)
    .then((success) => {
      if (success.status === 200) {
        dispatch({
          data: success.data.deletedPost,
          type: DELETE_POST_SUCCESS
        });
      }
    }).catch((error) => {
    dispatch({
      error: error.message || "ERROR HAPPENED",
      type: DELETE_POST_ERROR,
    });
  });
};

export const updatePost = (id, updateData, successCallback) => (dispatch, getState) => {

  axios.put('http://localhost:3001/api/posts/' + id, updateData)
    .then((success) => {

      if (success.status === 201) {
        dispatch({
          type: UPDATE_POST_SUCCESS,
          data: success.data.updatePost,
        });

        successCallback();
      }
    })
    .catch((error) => {
      dispatch({
        error: error.message || "ERROR HAPPENED",
        type: UPDATE_POST_ERROR,
      });
    });
};

