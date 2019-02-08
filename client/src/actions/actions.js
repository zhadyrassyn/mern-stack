import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FETCH_POST_SUCCESS,
  FETCH_POST_ERROR,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SIGNOUT,
  GET_PROFILE_POSTS_SUCCESS,
  GET_PROFILE_POSTS_ERROR,
  SAVE_PROFILE_POST_SUCCESS,
  SAVE_PROFILE_POST_ERROR,
  DELETE_PROFILE_POST_SUCCESS,
  DELETE_PROFILE_POST_ERROR,
  UPDATE_PROFILE_POST_SUCCESS,
  UPDATE_PROFILE_POST_ERROR,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
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

export const signin = (email, password, success) => (dispatch) => {
  axios.post('http://localhost:3001/api/auth/sign-in', {
    email,
    password,
  }).then((response) => {
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: SIGNIN_SUCCESS
    });
    success();
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: SIGNIN_ERROR
    });
  })
};

export const signup = (firstName, lastName,
                       email, password,
                       success, fail) => (dispatch) => {

  axios.post('http://localhost:3001/api/auth/sign-up', {
    firstName,
    lastName,
    email,
    password,
  }).then((response) => {
    localStorage.setItem('token', response.data.token);
    dispatch({
      type: SIGNUP_SUCCESS
    });
    success();
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: SIGNUP_ERROR
    });

    console.log('123 ',error.response);
    fail(error.response && error.response.data.error)
  });
};

export const signout = (callback) => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: SIGNOUT,
  });
};

const getHeaders = () => {
  return {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
};

/* PROFILE ACTIONS */
export const getProfilePosts = () => (dispatch) => {

  axios.get('http://localhost:3001/api/profiles/posts',
    {
      headers: getHeaders()
    }
  ).then((response) => {
    dispatch({
      type: GET_PROFILE_POSTS_SUCCESS,
      data: response.data.posts,
    });
  }).catch((error) => {
    dispatch({
      type: GET_PROFILE_POSTS_ERROR,
      error: error.response && error.response.error || 'INTERNAL_SERVER'
    });
  })
};

export const saveProfilePost = (formData, changeState) => (dispatch) => {
  axios.post('http://localhost:3001/api/profiles/posts', formData, {
    headers: getHeaders()
  })
    .then((success) => {
      if (success.status === 200) {
        const savedPost = success.data.savedPost;
        dispatch({
          type: SAVE_PROFILE_POST_SUCCESS,
          data: savedPost,
        });

        changeState();
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: SAVE_PROFILE_POST_ERROR,
        error: error.response && error.response.error || 'INTERNAL_SERVER'
      });
    });
};

export const deleteProfilePost = (id) => (dispatch) => {
  axios.delete('http://localhost:3001/api/profiles/posts/' + id, {
    headers: getHeaders(),
  })
    .then((success) => {
      if (success.status === 200) {
        dispatch({
          type: DELETE_PROFILE_POST_SUCCESS,
          data: id,
        });
      }
    }).catch((error) => {
    console.log(error);
    dispatch({
      type: DELETE_PROFILE_POST_ERROR,
      error: error.response && error.response.error || 'INTERNAL_SERVER'
    });
  });
};

export const updateProfilePost = (id, newPost, changeState) => (dispatch) => {
  axios.put('http://localhost:3001/api/posts/' + id, newPost, {
    headers: getHeaders(),
  })
    .then((success) => {
      if (success.status === 201) {
        const savedPost = success.data.updatePost;
        dispatch({
          type: UPDATE_PROFILE_POST_SUCCESS,
          data: savedPost,
        });

        changeState();
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: UPDATE_PROFILE_POST_ERROR,
        error: error.response && error.response.error || 'INTERNAL_SERVER'
      });
    });
};

export const getProfile = () => (dispatch) => {
  axios.get('http://localhost:3001/api/profile', {
    headers: getHeaders(),
  }).then((success) => {
    dispatch({
      type: GET_PROFILE_SUCCESS,
      data: success.data
    })
  }).catch((error) => {
    console.log(error);
    dispatch({
      type: GET_PROFILE_ERROR,
      error: error.response && error.response.error || 'INTERNAL_SERVER'
    });
  });
};