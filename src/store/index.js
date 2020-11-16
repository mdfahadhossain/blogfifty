import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
// import logger from 'redux-logger';

import auth from './auth';

export default createStore(
  combineReducers({
    auth,
  }),
  compose(
    applyMiddleware(
      promise
      // logger
    )
  )
);
