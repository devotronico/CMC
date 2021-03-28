import axios from 'axios';
import { setAlert } from '../alert/alertActions';
import { setLoader, removeLoader } from '../loader/loaderActions'; // TEST

import { NOTIFY_SEND, NOTIFY_ERROR } from './notifyTypes';

/// Alla creazione di una risorsa (es: articolo del blog)
// const button = document.querySelector('BUTTON');
// button.addEventListener('click', () => {
//   console.log('Sending Push...');

//   fetch('/push', {
//     method: 'POST',
//     body: JSON.stringify(postData),
//     headers: {
//       'content-type': 'application/json'
//     }
//   });
//   console.log('Push Sent...');
// });

/// CREATE PUSH
export const sendNotify = () => async dispatch => {
  dispatch(setLoader());

  const obj = {
    title: 'Titolo 6', // titolo del post
    message: 'by Daniele Manzi', // messagio della notifica
    url: 'https://example.com/', // url di destinazion al click sulla notifica
    ttl: 36000, // tempo di attesa di una notifica finchè l'utente non è online
    icon: 'https://i.imgur.com/Q8esUL7.png', // dm logo | 64 | 128
    image: 'https://i.imgur.com/knn2iSP.png', // dm logo 364*180
    data: 'Hello New World'
  };

  const body = JSON.stringify(obj); // [b]

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }; // [a]

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/notify/send`,
      body,
      config
    ); // [c]
    dispatch({ type: NOTIFY_SEND, payload: res.data });
  } catch (err) {
    console.log('ERRORE');
    console.error(err.response.data);
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error =>
        dispatch(setAlert(error.msg, error.type, error.title, error.timeout))
      );
    }

    dispatch({ type: NOTIFY_ERROR });
  }
  dispatch(removeLoader()); // TEST
};
