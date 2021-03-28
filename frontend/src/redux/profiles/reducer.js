import {
  PROFILES_CREATE,
  PROFILES_READ,
  PROFILES_UPDATE,
  PROFILES_UPDATE_SELECTED,
  PROFILES_DELETE,
  PROFILES_DELETE_SELECTED,
  PROFILES_ERROR
} from './types';

const initialState = {
  users: []
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILES_UPDATE:
    case PROFILES_DELETE:
      return state;
    case PROFILES_CREATE:
    case PROFILES_READ:
    case PROFILES_UPDATE_SELECTED:
    case PROFILES_DELETE_SELECTED:
      return {
        ...state,
        users: payload
      };
    case PROFILES_ERROR:
      return {
        ...state,
        users: []
      };
    default:
      return state;
  }
}
