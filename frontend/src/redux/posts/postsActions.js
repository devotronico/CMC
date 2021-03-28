import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions';

import {
  POSTS_CREATE,
  POSTS_READ,
  POSTS_UPDATE,
  POSTS_DELETE,
  POSTS_ERROR
} from './postsTypes';

/// CREATE POSTS
export const createPosts = posts => async dispatch => {
  dispatch(setLoader());

  dispatch(removeLoader());
};

/// READ POSTS
export const readPosts = () => async dispatch => {
  dispatch(setLoader());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/posts`,
      config
    );
    dispatch({ type: POSTS_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE POSTS_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: POSTS_ERROR });
  }
  dispatch(removeLoader());
};

/// UPDATE POSTS
export const updatePosts = () => async dispatch => {
  dispatch(setLoader());

  return {
    type: POSTS_UPDATE
  };
  dispatch(removeLoader());
};

/// DELETE POSTS
export const deletePosts = () => async dispatch => {
  dispatch(setLoader());

  return {
    type: POSTS_DELETE
  };
  dispatch(removeLoader());
};
