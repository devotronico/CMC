import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions';

import {
  PROFILES_CREATE,
  PROFILES_READ,
  PROFILES_UPDATE,
  PROFILES_UPDATE_SELECTED,
  PROFILES_DELETE,
  PROFILES_DELETE_SELECTED,
  PROFILES_ERROR
} from './types';

/// CREATE USERS
export const createProfiles = () => async (dispatch) => {
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
    dispatch({ type: PROFILES_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILES_CREATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: PROFILES_ERROR });
  }
  dispatch(removeLoader());
};

/// READ USERS
export const readProfiles = () => async (dispatch) => {
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
    dispatch({ type: PROFILES_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILES_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: PROFILES_ERROR });
  }
  dispatch(removeLoader());
};

/// UPDATE USERS
export const updateProfiles = () => async (dispatch) => {
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
    dispatch({ type: PROFILES_UPDATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILES_UPDATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: PROFILES_ERROR });
  }
  dispatch(removeLoader());
};

/// UPDATE SELECTED USERS
export const updateSelectedProfiles = (selected, type, value) => async (
  dispatch
) => {
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
    dispatch({ type: PROFILES_UPDATE_SELECTED, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILES_UPDATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: PROFILES_ERROR });
  }
  dispatch(removeLoader());
};

/// DELETE USERS
export const deleteProfiles = () => async (dispatch) => {
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
    dispatch({ type: PROFILES_DELETE, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILES_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: PROFILES_ERROR });
  }
  dispatch(removeLoader());
};

/// CREATE FAKE USERS
export const createFakeProfiles = (num) => async (dispatch) => {
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
    dispatch({ type: PROFILES_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILES_CREATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: PROFILES_ERROR });
  }
  dispatch(removeLoader());
};

/// DELETE SELECTED USERS
export const deleteSelectedProfiles = (selected) => async (dispatch) => {
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
    dispatch({ type: PROFILES_DELETE_SELECTED, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILES_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: PROFILES_ERROR });
  }
  dispatch(removeLoader());
};

/// DELETE FAKE USERS
export const deleteFakeProfiles = () => async (dispatch) => {
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
    dispatch({ type: PROFILES_DELETE, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILES_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: PROFILES_ERROR });
  }
  dispatch(removeLoader());
};
