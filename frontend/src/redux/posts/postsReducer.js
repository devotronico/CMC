import {
  POSTS_CREATE,
  POSTS_READ,
  POSTS_UPDATE,
  POSTS_DELETE,
  POSTS_ERROR
} from './postsTypes';

const POSTS_INITIAL_STATE = {
  posts: []
};

const postsLocalStorage = localStorage.getItem('posts')
  ? JSON.parse(localStorage.getItem('posts'))
  : null;
const postsState = postsLocalStorage ? postsLocalStorage : POSTS_INITIAL_STATE;

const postsReducer = (state = postsState, action) => {
  const { type, payload } = action;
  switch (type) {
    case POSTS_CREATE:
      console.log(action.newPost);
      // const id = state.length;
      // const id = v4();
      // action.newPost = { id, ...action.newPost };
      console.log(action.newPost);
      return [...state, action.newPost];
    case POSTS_READ:
      return {
        ...state,
        posts: payload
      };
    case POSTS_UPDATE:
      console.log('action.editedPost.id', action.editedPost.id);
      return state.map(post => {
        if (post.id === action.editedPost.id) {
          return action.editedPost;
        }
        return post;
      });

    case POSTS_DELETE:
      console.log('action.id', action.id);
      return state.filter(post => post.id !== action.id);

    case POSTS_CREATE:
      return [...state, ...action.posts];
    case POSTS_DELETE:
      return [];
    case POSTS_ERROR:
      return [];
    default:
      return state;
  }
};
export default postsReducer;
