import axios from 'axios';

export const fetchPosts = () => (dispatch, getState) => {
  dispatch({
    type: 'GET_POSTS_PROCESSING'
  });

  axios.get('http://localhost:3001/api/posts')
    .then((successResponse) => {
      dispatch({
        type: 'GET_POSTS_SUCCESS',
        data: successResponse.data.posts
      })
    })
    .catch((failureResponse) => {
      console.log('failureResponse ', failureResponse)
    })

};