import axios from 'axios';

/**
 * Setta il token negli headers delle request
 * Se il token esiste nel localStorage
 * viene inserito negli header delle
 * chiamate api fatte con axios
 * @param {String} token
 */
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// const logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('userData');
// };

// const saveTokenInBrowser = token => {
//   if (token) {
//     const tokenExpireAt = new Date(new Date().getTime() + 1000 * 60 * 60);
//     localStorage.setItem('tokenExpireAt', tokenExpireAt.toISOString());
//     const remainingTime = tokenExpireAt.getTime() - new Date().getTime();
//     let logoutTimer = setTimeout(logout, remainingTime);
//   } else {
//   }
// };

export default setAuthToken;
