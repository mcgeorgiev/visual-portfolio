import {Component, Redirect, Route} from "react-router-dom";
import React from "react";
import * as jwt from "jsonwebtoken";
const axios = require('axios');

export const Auth = {

  isAuthenticated: function () {
    try {
      return (jwt.decode(window.localStorage.getItem('auth-jwt'), {complete: true}).payload.exp < new Date().getTime());
    } catch (err) {
      return false;
    }
  },

  obtain(username, password, callback) {
    return axios.post('http://127.0.0.1:8000/api-token-auth/', {
      username: username,
      password: password
    })
      .then((response) => {
        window.localStorage.setItem("auth-jwt", response.data.token);
        callback();
      })
      .catch((error) => {
        console.log(error)
      });
  },

  signout(cb) {
    this.isAuth = false
  }
};

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);



