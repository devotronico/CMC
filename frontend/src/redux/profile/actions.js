import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions';

import {
  PROFILE_CREATE,
  PROFILE_READ,
  PROFILE_UPDATE,
  PROFILE_DELETE,
  PROFILE_ERROR,
  PROFILE_CLEAR
} from './types';

/// CREATE USER
export const createProfile = ({ name, email, password, isActive }) => async (
  dispatch
) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }; // [a]
  const body = JSON.stringify({ name, email, password, isActive }); // [b]

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/create`,
      body,
      config
    ); // [c]
    dispatch({ type: PROFILE_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }

    dispatch({ type: PROFILE_ERROR });
  }
  dispatch(removeLoader());
};

/// CLEAR PROFILE
export const clearProfile = () => async (dispatch) => {
  dispatch(setLoader());
  dispatch({ type: PROFILE_CLEAR });
  dispatch(removeLoader());
};

/*


export const createProfile = (name, email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }; // [a]

  const body = JSON.stringify({ name, email, password }); // [b]

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/user`,
      body,
      config
    ); // [c]
    dispatch({ type: PROFILE_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILE_CREATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: PROFILE_ERROR });
  }
};
*/

/// READ USER
export const readProfile = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }; // [a]

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      config
    ); // [c]
    dispatch({ type: PROFILE_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILE_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: PROFILE_ERROR });
  }
};

/// UPDATE USER
export const updateProfile = (id, name, email, password) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      body,
      config
    );
    dispatch({ type: PROFILE_UPDATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILE_UPDATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: PROFILE_ERROR });
  }
};

/// DELETE USER
export const deleteProfile = (id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ id });

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/user/${id}`,
      body,
      config
    );
    dispatch({ type: PROFILE_DELETE, payload: res.data });
  } catch (err) {
    console.log('ERRORE PROFILE_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: PROFILE_ERROR });
  }
};
