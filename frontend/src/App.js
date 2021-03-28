import React from 'react';

import { Provider } from 'react-redux'; // redux
import store from './redux/store'; // redux

import subscribeToNotify from './utils/notify';

import Container from './components/layout/Container';

export default function App() {
  // console.log('store', store.getState());
  // console.log('TEST 0', process.env.REACT_APP_API_URL);
  // console.log('App');
  subscribeToNotify();
  // console.log('token in localStorage: ', localStorage.token);

  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}
