import {
  POST_CREATE,
  POST_READ,
  POST_UPDATE,
  POST_DELETE,
  POST_LIKES_UPDATE,
  POST_ERROR,
} from './postTypes';

const POST_INITIAL_STATE = {
  post: null,
};

const postLocalStorage = localStorage.getItem('post')
  ? JSON.parse(localStorage.getItem('post'))
  : null;

const postState = postLocalStorage ? postLocalStorage : POST_INITIAL_STATE;

const postReducer = (state = postState, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_CREATE:
      return { ...state, post: payload };
    case POST_READ:
      console.log('PAYLOAD', payload);
      return { ...state, post: payload };
    case POST_UPDATE:
      console.log('action.editedPost.id', action.editedPost.id);
      return state.map((post) => {
        if (post.id === action.editedPost.id) {
          return action.editedPost;
        }
        return post;
      });

    case POST_DELETE:
    case POST_ERROR:
      return { ...state, post: null };
    default:
      return state;
  }
};
export default postReducer;
