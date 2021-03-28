import {
  USER_CREATE,
  USER_READ,
  USER_UPDATE,
  USER_DELETE,
  USER_ERROR,
  USER_CLEAR
} from './userTypes';

const initialState = {
  user: null,
  loading: true
};

// const initialState = {
//   token: localStorage.getItem('token'),
//   isAuthenticated: null,
//   loading: true,
//   user: null
// };

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_CREATE:
      return {
        ...state,
        loading: false,
        user: payload
      };
    case USER_UPDATE:
    case USER_DELETE:
      return state;
    case USER_READ:
      return {
        ...state,
        loading: false,
        user: payload
      };
    case USER_CLEAR:
    case USER_ERROR:
      return {
        ...state,
        loading: true,
        user: null
      };
    default:
      return state;
  }
}
