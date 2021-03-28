import { LOADER_START, LOADER_FINISH } from './loaderTypes';

const initialState = {
  isLoading: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOADER_START:
      return { ...state, isLoading: payload };
    case LOADER_FINISH:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
}
