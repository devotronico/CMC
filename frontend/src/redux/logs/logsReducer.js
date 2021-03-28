import {
  LOG_CREATE,
  LOG_READ,
  LOG_UPDATE,
  LOG_DELETE,
  LOGS_CREATE,
  LOGS_READ,
  LOGS_UPDATE,
  LOGS_DELETE,
  LOGS_DELETE_FAKE,
  LOGS_ERROR
} from './logsTypes';

const initialState = {
  loading: true,
  logs: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOG_CREATE:
    case LOGS_CREATE:
    case LOG_READ:
    case LOGS_READ:
    case LOG_UPDATE:
    case LOGS_UPDATE:
      return {
        ...state,
        loading: false,
        logs: payload
      };
    case LOG_DELETE:
    case LOGS_DELETE:
    case LOGS_DELETE_FAKE:
    case LOGS_ERROR:
      return {
        ...state,
        loading: false,
        logs: []
      };
    default:
      return state;
  }
}
