import { v4 as uuidv4 } from 'uuid';
// import uuid from 'uuid';

import { SET_ALERT, REMOVE_ALERT } from './alertTypes';

export const setAlert = (msg, type, title, timeout = 6000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, type, title, timeout, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
