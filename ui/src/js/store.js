import {reducers} from "./reducers";
import {applyMiddleware, compose, createStore} from "redux";

import createSagaMiddleware from 'redux-saga'

export const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware( sagaMiddleware))
)