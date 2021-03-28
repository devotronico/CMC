import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions';

import {
  LOG_CREATE,
  LOGS_CREATE,
  LOG_READ,
  LOGS_READ,
  LOG_UPDATE,
  LOGS_UPDATE,
  LOG_DELETE,
  LOGS_DELETE,
  LOGS_DELETE_FAKE,
  LOG_ERROR,
  LOGS_ERROR
} from './logsTypes';

/// CREATE FAKE LOGS
export const createFakeLogs = num => async dispatch => {
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
      `${process.env.REACT_APP_API_URL}/logs/fake`,
      body,
      config
    );
    dispatch({ type: LOGS_CREATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE LOGS_CREATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOGS_ERROR });
  }
  dispatch(removeLoader());
};

/// READ LOG
export const readLog = id => async dispatch => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/logs/${id}`,
      config
    );
    dispatch({ type: LOG_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE LOG_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOG_ERROR });
  }
  dispatch(removeLoader());
};

/// READ LOGS
export const readLogs = () => async dispatch => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/logs`,
      config
    );
    dispatch({ type: LOGS_READ, payload: res.data });
  } catch (err) {
    console.log('ERRORE LOGS_READ');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOGS_ERROR });
  }
  dispatch(removeLoader());
};

/* /// UPDATE LOG
export const updateLog = (id) => async dispatch => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/logs/${id}`,
      body,
      config
    );
    dispatch({ type: LOG_UPDATE, payload: res.data });
  } catch (err) {
    console.log('ERRORE LOG_UPDATE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOG_ERROR });
  }
  dispatch(removeLoader());
}; */

/// DELETE LOG
export const deleteLog = id => async dispatch => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ id });

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/logs/${id}`,
      body,
      config
    );
    dispatch({ type: LOG_DELETE, payload: res.data });
  } catch (err) {
    console.log('ERRORE LOG_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOG_ERROR });
  }
  dispatch(removeLoader());
};

/// DELETE LOGS
export const deleteLogs = () => async dispatch => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/logs`,
      config
    );
    dispatch({ type: LOGS_DELETE, payload: res.data });
  } catch (err) {
    console.log('ERRORE LOGS_DELETE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOGS_ERROR });
  }
  dispatch(removeLoader());
};

/// DELETE FAKE LOGS
export const deleteFakeLogs = type => async dispatch => {
  dispatch(setLoader());

  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_API_URL}/logs/fake`,
      {
        data: { type },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    dispatch({ type: LOGS_DELETE_FAKE, payload: res.data });
  } catch (err) {
    console.log('ERRORE LOGS_DELETE_FAKE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOGS_ERROR });
  }
  dispatch(removeLoader());
};
