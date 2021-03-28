import { NOTIFY_SEND, NOTIFY_ERROR } from './notifyTypes';

const initialState = {
  notify: null,
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case NOTIFY_SEND:
      return {
        ...state,
        loading: false,
        user: payload
      };
    case NOTIFY_ERROR:
      return {
        ...state,
        loading: true,
        user: null
      };
    default:
      return state;
  }
}
