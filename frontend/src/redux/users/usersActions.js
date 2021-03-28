import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions';

import {
  USERS_CREATE,
  USERS_READ,
  USERS_UPDATE,
  USERS_UPDATE_SELECTED,
  USERS_DELETE,
  USERS_DELETE_SELECTED,
  USERS_ERROR
} from './usersTypes';

/// CREATE USERS
export const createUsers = () => async dispatch => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users`,
      config
    ); // [c]
    dispatch({ type: USERS_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE USERS_CREATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: USERS_ERROR });
  }
  dispatch(removeLoader());
};

/// READ USERS
export const readUsers = () => async dispatch => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/users`,
      config
    ); // [c]
    dispatch({ type: USERS_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE USERS_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: USERS_ERROR });
  }
  dispatch(removeLoader());
};

/// UPDATE USERS
export const updateUsers = () => async dispatch => {
  dispatch(setLoader());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/users`,
      config
    ); // [c]
    dispatch({ type: USERS_UPDATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE USERS_UPDATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: USERS_ERROR });
  }
  dispatch(removeLoader());
};

/// UPDATE SELECTED USERS
export const updateSelectedUsers = (
  selected,
  type,
  value
) => async dispatch => {
  dispatch(setLoader());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  console.log('SELECTED', selected);
  console.log('TYPE', type);
  console.log('SELECTED', selected);
  const body = JSON.stringify({ selected, type, value }); // [b]
  console.log('BODY', body);

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/users/selected`,
      body,
      config
    ); // [c]
    dispatch({ type: USERS_UPDATE_SELECTED, payload: res.data });
  } catch (err) {
    console.log('ERRORE USERS_UPDATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: USERS_ERROR });
  }
  dispatch(removeLoader());
};

/// DELETE USERS
export const deleteUsers = () => async dispatch => {
  dispatch(setLoader());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/users`,
      config
    ); // [c]
    dispatch({ type: USERS_DELETE, payload: res.data });
  } catch (err) {
    console.log('ERRORE USERS_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: USERS_ERROR });
  }
  dispatch(removeLoader());
};

/// CREATE FAKE USERS
export const createFakeUsers = num => async dispatch => {
  dispatch(setLoader());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const number = num.toString();
  const body = JSON.stringify({ number });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/users/fake`,
      body,
      config
    ); // [c]
    dispatch({ type: USERS_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE USERS_CREATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: USERS_ERROR });
  }
  dispatch(removeLoader());
};

/// DELETE SELECTED USERS
export const deleteSelectedUsers = selected => async dispatch => {
  dispatch(setLoader());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/users/selected`,
      { data: { list: selected }, config }
    ); // [c]
    dispatch({ type: USERS_DELETE_SELECTED, payload: res.data });
  } catch (err) {
    console.log('ERRORE USERS_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: USERS_ERROR });
  }
  dispatch(removeLoader());
};

/// DELETE FAKE USERS
export const deleteFakeUsers = () => async dispatch => {
  dispatch(setLoader());

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/users/fake`,
      config
    ); // [c]
    dispatch({ type: USERS_DELETE, payload: res.data });
  } catch (err) {
    console.log('ERRORE USERS_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: USERS_ERROR });
  }
  dispatch(removeLoader());
};
