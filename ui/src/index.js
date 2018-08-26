import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';
import {Router} from 'react-router-dom';
import './css/styles/Landing.scss';
import { Provider } from "react-redux";
import {watchForLoginSubmitted} from "./js/saga";
import {sagaMiddleware, store, history} from "./js/store";

sagaMiddleware.run(watchForLoginSubmitted);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
