import {applyMiddleware, compose, createStore} from "redux";
import createHistory from 'history/createBrowserHistory'

import createSagaMiddleware from 'redux-saga'
import {routerMiddleware} from "react-router-redux";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {reducers} from "./reducers/index";

export const history = createHistory()
export const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  whitelist: ['session'],
  storage,
}

const customMiddleWare = store => next => action => {
  console.log("Middleware triggered:", action)
  console.log(next)
  console.log(store.getState())
  next(action);
  return {
    ...store.getState(),
    login: {foo: "bar"}
  }
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history), customMiddleWare))
)

export const persistor = persistStore(store)
