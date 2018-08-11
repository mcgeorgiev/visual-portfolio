import {reducers} from "./reducers";
import {createStore} from "redux";

export function configureStore(initialState = {}) {
  return createStore(reducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}

export const store = configureStore();