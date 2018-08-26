import {reducers} from "./reducers";
import {applyMiddleware, compose, createStore} from "redux";
import createHistory from 'history/createBrowserHistory'

import createSagaMiddleware from 'redux-saga'
import {routerMiddleware} from "react-router-redux";

export const history = createHistory()
export const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
)