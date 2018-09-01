import React from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import {store} from "../store"
import * as jwt from "jsonwebtoken";
import {redirectToLogin} from "../actions/session";
export function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps() {
      this.checkAuth();
    }

    checkAuth() {
      try {
        jwt.verify(this.props.token, 'f_w^fy7oax5&iln&l@a4z@*m3ts584%pbx*fnxd7108$rj84t3')
      } catch (error) {
        store.dispatch(redirectToLogin())
      }
    }

    render() {
      return (
        <div>
            <Component {...this.props}/>
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    token: state.session.token,
  });

  return connect(mapStateToProps)(AuthenticatedComponent);

}