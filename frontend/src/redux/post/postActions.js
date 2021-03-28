import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions';

import {
  POST_CREATE,
  POST_READ,
  POST_UPDATE,
  POST_DELETE,
  POST_LIKES_UPDATE,
  POST_ERROR
} from './postTypes';

/// CREATE POST
export const createPost = (title, text, tags) => async (dispatch) => {
  console.log('TEST 2');

  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // const number = num.toString();
  const body = JSON.stringify({ title, text, tags });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/post`,
      body,
      config
    );
    dispatch({ type: POST_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE POST_CREATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: POST_ERROR });
  }
  dispatch(removeLoader());
};

/// READ POST
export const readPost = (id) => async (dispatch) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/post/${id}`,
      config
    );
    console.log('DATA', res.data);
    dispatch({ type: POST_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE POST_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: POST_ERROR });
  }
  dispatch(removeLoader());
};

/// UPDATE POST
export const updatePost = (updatePost) => {
  console.log('updatePost', updatePost);
  return {
    type: POST_UPDATE,
    updatePost: updatePost
  };
};

/// DELETE POST
export const deletePost = (id) => async (dispatch) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/post/${id}`,
      config
    );
    // console.log('DATA', res.data);
    dispatch({ type: POST_DELETE, payload: res.data });
  } catch (err) {
    console.log('ERRORE POST_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: POST_ERROR });
  }
  dispatch(removeLoader());
};

/// ADD like
export const addLike = (id) => async (dispatch) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  return {
    type: POST_LIKES_UPDATE,
    post: id
  };
  // try {
  //   const res = await axios.put(
  //     `${process.env.REACT_APP_API_URL}/post/like/${id}`
  //   );
  //   dispatch({
  //     type: POST_LIKES_UPDATE,
  //     payload: { id, likes: res.data }
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: POST_ERROR,
  //     payload: { msg: err.response.statusText, status: err.response.status }
  //   });
  // }
};

/// REMOVE like
export const removeLike = (id) => async (dispatch) => {
  return {
    type: POST_LIKES_UPDATE,
    post: id
  };
  // try {
  //   const res = await axios.put(
  //     `${process.env.REACT_APP_API_URL}/post/unlike/${id}`
  //   );
  //   dispatch({
  //     type: POST_LIKES_UPDATE,
  //     payload: { id, likes: res.data }
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: POST_ERROR,
  //     payload: { msg: err.response.statusText, status: err.response.status }
  //   });
  // }
};

/// FOLLOW POST USER
export const followPostUser = (id) => async (dispatch) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/post/user/${id}`,
      config
    );
    console.log('DATA', res.data);
    dispatch({ type: POST_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE POST_FOLLOW');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: POST_ERROR });
  }
  dispatch(removeLoader());
};
