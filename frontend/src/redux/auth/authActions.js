import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions'; // TEST
import {
  REGISTER_SUCCESS,
  VERIFY_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  USER_NOT_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  NEW_PASSWORD_SUCCESS,
  NEW_PASSWORD_FAIL,
  DELETE_ACCOUNT
} from './authTypes';

import setAuthToken from '../../utils/setAuthToken';

/**
 * [a] Se il token è presente nel localstorage
 * viene inserito negli headers per le request api al server.
 * Dal server la rotta `/api/auth` è gestita
 * nel file `root\routes\api\auth.js` script[1].
 * [b] Fa una request al server con il token
 * [c] Se il token inviato è valido si ottengono i dati dell'user:
 *    {_id, name, email, avatar, role, date, __v}
 *    che vengono passati nella prop `payload`
 */
export const loadUser = () => async (dispatch) => {
  dispatch(setLoader());
  // const timeStart = new Date();
  if (localStorage.token) {
    setAuthToken(localStorage.token); // [a]
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth`); // [a]
      dispatch({ type: USER_LOADED, payload: res.data }); // [c]
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  } else {
    dispatch({ type: USER_NOT_LOADED });
    console.log('Il token NON è nel localStorage');
  }
  dispatch(removeLoader());
  // const timeFinish = new Date();
  // const timeDifference = timeFinish - timeStart; //milliseconds interval
  // console.log('timeFinish', timeFinish);
  // console.log('timeStart', timeStart);
  // console.log('timeDifference', timeDifference);
};

/// REGISTER
/**
 * [a] Setta negli headers il 'Content-Type' in formato json.
 * [b] Crea la var `body` che deve essere una stringa in formato json
 *     che deve contenere i valori di username, email, password
 * [c] Fa la request col metodo POST con il body e gli headers settati prima.
 *
 */
export const register = ({ username, email, password }) => async (dispatch) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }; // [a]
  const body = JSON.stringify({ username, email, password }); // [b]

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      body,
      config
    ); // [c]
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    console.log('ERRORE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }

    dispatch({ type: REGISTER_FAIL });
  }
  dispatch(removeLoader());
};

/// VERIFICATION USER
export const verification = (hash, history) => async (dispatch) => {
  dispatch(setLoader()); // TEST
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ hash });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/verify`,
      body,
      config
    );
    dispatch({ type: VERIFY_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log('errors:', errors);

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOGIN_FAIL });
  }
  dispatch(removeLoader());
  history.push('/');
};

/// LOGIN USER
export const login = ({ email, password, history }) => async (dispatch) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      body,
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log('errors:', errors);

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOGIN_FAIL });
  }
  dispatch(removeLoader());
  history.push('/');
};

/// LOGOUT USER
export const logout = (history) => async (dispatch) => {
  dispatch(setLoader());
  try {
    await axios.put(`${process.env.REACT_APP_API_URL}/auth/logout`);
    dispatch({ type: LOGOUT });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log('errors:', errors);

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: LOGIN_FAIL });
  }

  dispatch(removeLoader());
  history.push('/');
};

/// RESET PASSWORD
export const resetPassword = ({ email }) => async (dispatch) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }; // [a]
  const body = JSON.stringify({ email }); // [b]

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/reset-password`,
      body,
      config
    ); // [c]
    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: res.data });
  } catch (err) {
    console.log('ERRORE: RESET_PASSWORD_SUCCESS');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: RESET_PASSWORD_FAIL });
  }
  dispatch(removeLoader()); // TEST
};

/// NEW PASSWORD
export const newPassword = ({ hash, password, history }) => async (
  dispatch
) => {
  dispatch(setLoader());
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }; // [a]
  const body = JSON.stringify({ hash, password }); // [b]

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/new-password`,
      body,
      config
    ); // [c]
    dispatch({ type: NEW_PASSWORD_SUCCESS, payload: res.data });
  } catch (err) {
    console.log('ERRORE: NEW_PASSWORD');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: NEW_PASSWORD_FAIL });
  }
  dispatch(removeLoader());
  history.push('/');
};

/// DELETE ACCOUNT OF USER
export const deleteAccount = () => async (dispatch) => {
  dispatch(setLoader());
  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // };

  // const body = JSON.stringify({ email });

  try {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/auth`);
    dispatch({ type: DELETE_ACCOUNT });
  } catch (err) {
    console.log('ERRORE DELETE_ACCOUNT');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }
    dispatch({ type: AUTH_ERROR });
  }
  dispatch(removeLoader());
};
