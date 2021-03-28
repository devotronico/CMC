import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions';

import {
  COMMENTS_CREATE,
  COMMENTS_READ,
  COMMENTS_UPDATE,
  COMMENTS_DELETE,
  COMMENTS_ERROR,
} from './commentsTypes';

/// CREATE COMMENTS
export const createComments = (comments) => async (dispatch) => {
  dispatch(setLoader());

  dispatch(removeLoader());
};

/// READ COMMENTS
export const readComments = () => async (dispatch) => {
  dispatch(setLoader());

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/comments`,
      config
    );
    dispatch({ type: COMMENTS_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE COMMENTS_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: COMMENTS_ERROR });
  }
  dispatch(removeLoader());
};

/// UPDATE COMMENTS
export const updateComments = () => async (dispatch) => {
  dispatch(setLoader());

  return {
    type: COMMENTS_UPDATE,
  };
  dispatch(removeLoader());
};

/// DELETE COMMENTS
export const deleteComments = () => async (dispatch) => {
  dispatch(setLoader());

  return {
    type: COMMENTS_DELETE,
  };
  dispatch(removeLoader());
};
