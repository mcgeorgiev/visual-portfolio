import {reducers} from "./reducers";
import {applyMiddleware, compose, createStore} from "redux";

import createSagaMiddleware from 'redux-saga'

export const middleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export function configureStore(initialState = {}) {
  return createStore(reducers, initialState, composeEnhancers(applyMiddleware(middleware))
  );
}

export const store = configureStore();