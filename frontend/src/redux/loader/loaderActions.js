import { LOADER_START, LOADER_FINISH } from './loaderTypes';

export const setLoader = () => dispatch => {
  dispatch({
    type: LOADER_START,
    payload: true
  });
};

export const removeLoader = () => dispatch => {
  console.log('removeLoader');
  dispatch({
    type: LOADER_FINISH,
    payload: false
  });
};
