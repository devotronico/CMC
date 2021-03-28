import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions';

import {
  COMMENT_CREATE,
  COMMENT_READ,
  COMMENT_UPDATE,
  COMMENT_DELETE,
  COMMENT_LIKES_UPDATE,
  COMMENT_ERROR,
} from './commentTypes';

/// CREATE COMMENT
export const createComment = (text, post_id) => async (dispatch) => {
  console.log('TEST 2');

  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // const number = num.toString();
  const body = JSON.stringify({ text, post_id });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/comment`,
      body,
      config
    );
    console.log('RES.DATA', res.data);
    dispatch({ type: COMMENT_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE COMMENT_CREATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: COMMENT_ERROR });
  }
  dispatch(removeLoader());
};

/// READ COMMENT
export const readComment = (id) => async (dispatch) => {
  console.log('OOOOOKKKKK');
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log('ID 1:', id);

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/comment/${id}`,
      config
    );
    console.log('DATA', res.data);
    dispatch({ type: COMMENT_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE COMMENT_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: COMMENT_ERROR });
  }
  dispatch(removeLoader());
};

/// UPDATE COMMENT
export const updateComment = (updateComment) => {
  console.log('updateComment', updateComment);
  return {
    type: COMMENT_UPDATE,
    updateComment: updateComment,
  };
};

/// DELETE COMMENT
export const deleteComment = (id) => {
  return {
    type: COMMENT_DELETE,
    id: id,
  };
};

/// ADD like
export const addLike = (id) => async (dispatch) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return {
    type: COMMENT_LIKES_UPDATE,
    comment: id,
  };
  // try {
  //   const res = await axios.put(
  //     `${process.env.REACT_APP_API_URL}/comment/like/${id}`
  //   );
  //   dispatch({
  //     type: COMMENT_LIKES_UPDATE,
  //     payload: { id, likes: res.data }
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: COMMENT_ERROR,
  //     payload: { msg: err.response.statusText, status: err.response.status }
  //   });
  // }
};

/// REMOVE like
export const removeLike = (id) => async (dispatch) => {
  return {
    type: COMMENT_LIKES_UPDATE,
    comment: id,
  };
  // try {
  //   const res = await axios.put(
  //     `${process.env.REACT_APP_API_URL}/comment/unlike/${id}`
  //   );
  //   dispatch({
  //     type: COMMENT_LIKES_UPDATE,
  //     payload: { id, likes: res.data }
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: COMMENT_ERROR,
  //     payload: { msg: err.response.statusText, status: err.response.status }
  //   });
  // }
};
