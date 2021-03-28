import {
  REGISTER_SUCCESS,
  VERIFY_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_NOT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  DELETE_ACCOUNT
} from './authTypes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: null,
        loading: false
      };
    case LOGIN_SUCCESS:
    case VERIFY_SUCCESS:
    case NEW_PASSWORD_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: payload,
        isAuthenticated: null,
        loading: false
      };
    case USER_NOT_LOADED:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case RESET_PASSWORD_FAIL:
    case NEW_PASSWORD_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
