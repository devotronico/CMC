import {
  USERS_CREATE,
  USERS_READ,
  USERS_UPDATE,
  USERS_UPDATE_SELECTED,
  USERS_DELETE,
  USERS_DELETE_SELECTED,
  USERS_ERROR
} from './usersTypes';

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USERS_UPDATE:
    case USERS_DELETE:
      return state;
    case USERS_CREATE:
    case USERS_READ:
    case USERS_UPDATE_SELECTED:
    case USERS_DELETE_SELECTED:
      return {
        ...state,
        users: payload
      };
    case USERS_ERROR:
      return {
        ...state,
        users: []
      };
    default:
      return state;
  }
}
