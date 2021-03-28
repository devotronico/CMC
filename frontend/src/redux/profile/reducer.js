import {
  PROFILE_CREATE,
  PROFILE_READ,
  PROFILE_UPDATE,
  PROFILE_DELETE,
  PROFILE_ERROR,
  PROFILE_CLEAR
} from './types';

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

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_CREATE:
      return {
        ...state,
        loading: false,
        user: payload
      };
    case PROFILE_UPDATE:
    case PROFILE_DELETE:
      return state;
    case PROFILE_READ:
      return {
        ...state,
        loading: false,
        user: payload
      };
    case PROFILE_CLEAR:
    case PROFILE_ERROR:
      return {
        ...state,
        loading: true,
        user: null
      };
    default:
      return state;
  }
}
