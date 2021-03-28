import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions';

import {
  USER_CREATE,
  USER_READ,
  USER_UPDATE,
  USER_DELETE,
  USER_ERROR,
  USER_CLEAR
} from './userTypes';

/// CREATE USER
export const createUser = ({ name, email, password, isActive }) => async (
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
    dispatch({ type: USER_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }

    dispatch({ type: USER_ERROR });
  }
  dispatch(removeLoader());
};

/// CLEAR PROFILE
export const clearUser = () => async (dispatch) => {
  dispatch(setLoader());
  dispatch({ type: USER_CLEAR });
  dispatch(removeLoader());
};

/*


export const createUser = (name, email, password) => async dispatch => {
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
    dispatch({ type: USER_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE USER_CREATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: USER_ERROR });
  }
};
*/

/// READ USER
export const readUser = (id) => async (dispatch) => {
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
    dispatch({ type: USER_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE USER_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: USER_ERROR });
  }
};

/// UPDATE USER
export const updateUser = (id, name, email, password) => async (dispatch) => {
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
    dispatch({ type: USER_UPDATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE USER_UPDATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: USER_ERROR });
  }
};

/// DELETE USER
export const deleteUser = (id) => async (dispatch) => {
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
    dispatch({ type: USER_DELETE, payload: res.data });
  } catch (err) {
    console.log('ERRORE USER_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: USER_ERROR });
  }
};
