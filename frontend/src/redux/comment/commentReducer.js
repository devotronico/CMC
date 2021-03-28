import {
  COMMENT_CREATE,
  COMMENT_READ,
  COMMENT_UPDATE,
  COMMENT_DELETE,
  COMMENT_LIKES_UPDATE,
  COMMENT_ERROR,
} from './commentTypes';

const COMMENT_INITIAL_STATE = {
  comment: null,
};

/* const COMMENT_INITIAL_STATE = {
  comments: [],
}; */

const commentLocalStorage = localStorage.getItem('comment')
  ? JSON.parse(localStorage.getItem('comment'))
  : null;

const commentState = commentLocalStorage
  ? commentLocalStorage
  : COMMENT_INITIAL_STATE;

const commentReducer = (state = commentState, action) => {
  const { type, payload } = action;
  switch (type) {
    case COMMENT_CREATE:
      console.log('REDUCER COMMENT_CREATE');
      return { ...state, comment: payload };
    // return { ...state, comments: payload };
    case COMMENT_READ:
      console.log('PAYLOAD', payload);
      return { ...state, comment: payload };
    case COMMENT_UPDATE:
      // console.log('action.editedComment.id', action.editedComment.id);
      return state.map((comment) => {
        if (comment.id === action.editedComment.id) {
          return action.editedComment;
        }
        return comment;
      });

    case COMMENT_DELETE:
    case COMMENT_ERROR:
      return { ...state, comments: [] };
    default:
      return state;
  }
};
export default commentReducer;
