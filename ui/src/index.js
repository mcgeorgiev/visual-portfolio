import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/components/App';
import { BrowserRouter } from 'react-router-dom';
import './css/styles/Landing.scss';
import { Provider } from "react-redux";
// import {store, middleware} from "./js/store";
import mySaga from "./js/saga";
import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, compose, createStore} from "redux";
import {reducers} from "./js/reducers";


const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware( sagaMiddleware))
)

sagaMiddleware.run(mySaga);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
