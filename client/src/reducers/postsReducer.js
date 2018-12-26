const initialState = {
  processing: false,
  posts: []
};

const posts = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTS_PROCESSING':
      return {
        ...initialState,
        processing: true
      };
    case 'GET_POSTS_SUCCESS':
      return {
        ...initialState,
        processing: false,
        posts: action.data
      };
    case 'GET_POSTS_FAILURE':
      return {
        ...initialState,
        processing: false,
        error: action.message
      };
    default:
      return state;
  }
};

export default posts;