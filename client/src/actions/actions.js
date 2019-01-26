import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  SAVE_POST_SUCCESS,
  SAVE_POST_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR, SIGN_OUT,
} from "../types/types";
import axios from 'axios';

export const fetchPost = (id) => (dispatch) => {
  axios('http://localhost:3001/api/posts/' + id)
    .then((success) => {
      dispatch({
        type: FETCH_POST_SUCCESS,
        data: success.data.post
      })
    })
    .catch(function(error) {
      dispatch({
        type: FETCH_POST_ERROR,
        error: error.message || "ERROR HAPPENED"
      })
    })
};

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

export const savePost = (formData, changeState) => (dispatch) => {
  axios.post('http://localhost:3001/api/posts', formData)
    .then((success) => {
      if (success.status === 200) {
        const savedPost = success.data.savedPost;
        dispatch({
          type: SAVE_POST_SUCCESS,
          data: savedPost,
        });

        changeState();
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SAVE_POST_ERROR,
        error: error.message || "ERROR HAPPENED"
      });
    });
};

export const editPost = (id, newPost, changeState) => (dispatch) => {
  axios.put('http://localhost:3001/api/posts/' + id, newPost)
    .then((success) => {
      if (success.status === 201) {
        const savedPost = success.data.updatePost;
        dispatch({
          type: EDIT_POST_SUCCESS,
          data: savedPost,
        });

        changeState();
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: EDIT_POST_ERROR,
        error: error.message || "ERROR HAPPENED"
      });
    });
};

export const deletePost = (id) => (dispatch) => {
  axios.delete('http://localhost:3001/api/posts/' + id)
    .then((success) => {
      if (success.status === 200) {
        dispatch({
          type: DELETE_POST_SUCCESS,
          data: id,
        });
      }
    }).catch((error) => {
      console.log(error);
      dispatch({
        type: DELETE_POST_ERROR,
        error: error.message || "ERROR HAPPENED"
      });
    });
};

export const signin = (email, password, successCallback, errorCallback) => (dispatch) => {
  console.log('email ', email, password);
  axios.post('http://localhost:3001/api/auth/sign-in', {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch({
        type: SIGN_IN_SUCCESS
      });
      successCallback();
  }).catch((error) => {
      dispatch({
        type: SIGN_IN_ERROR
      });

      errorCallback();
      // errorCallback('Email ');
  })
};

export const signout = (callback) => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: SIGN_OUT,
  });
  callback();
};
