import {
  COMMENTS_CREATE,
  COMMENTS_READ,
  COMMENTS_UPDATE,
  COMMENTS_DELETE,
  COMMENTS_ERROR,
} from './commentsTypes';

const COMMENTS_INITIAL_STATE = {
  comments: [],
};

const commentsLocalStorage = localStorage.getItem('comments')
  ? JSON.parse(localStorage.getItem('comments'))
  : null;
const commentsState = commentsLocalStorage
  ? commentsLocalStorage
  : COMMENTS_INITIAL_STATE;

const commentsReducer = (state = commentsState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMENTS_CREATE:
      console.log(action.newPost);
      // const id = state.length;
      // const id = v4();
      // action.newPost = { id, ...action.newPost };
      console.log(action.newPost);
      return [...state, action.newPost];
    case COMMENTS_READ:
      return {
        ...state,
        comments: payload,
      };
    case COMMENTS_UPDATE:
      console.log('action.editedPost.id', action.editedPost.id);
      return state.map((post) => {
        if (post.id === action.editedPost.id) {
          return action.editedPost;
        }
        return post;
      });

    case COMMENTS_DELETE:
      console.log('action.id', action.id);
      return state.filter((post) => post.id !== action.id);

    case COMMENTS_CREATE:
      return [...state, ...action.comments];
    case COMMENTS_DELETE:
      return [];
    case COMMENTS_ERROR:
      return [];
    default:
      return state;
  }
};
export default commentsReducer;
