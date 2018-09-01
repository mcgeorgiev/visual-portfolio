import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';
import {Router} from 'react-router-dom';
import './css/styles/Landing.scss';
import { Provider } from "react-redux";
import {watchForLoginSubmitted} from "./js/saga";
import {sagaMiddleware, store, history, persistor} from "./js/store";
import {PersistGate} from "redux-persist/es/integration/react";

sagaMiddleware.run(watchForLoginSubmitted);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
