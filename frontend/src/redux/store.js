import { createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

/// LIB MIDDLEWARE
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

/*
/// Senza MIDDLEWARE
import { createStore } from 'redux';
import rootReducer from './rootReducer';
const store = createStore(rootReducer);
export default store;
*/
