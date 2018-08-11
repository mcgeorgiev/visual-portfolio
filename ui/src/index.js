import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/components/App';
import { BrowserRouter } from 'react-router-dom';
import './css/styles/Landing.scss';
import { Provider } from "react-redux";
import {store} from "./js/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
