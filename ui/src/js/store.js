import {reducers} from "./reducers";
import {createStore} from "redux";

export function configureStore(initialState = {}) {
  const store = createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return store;
};

export const store = configureStore();