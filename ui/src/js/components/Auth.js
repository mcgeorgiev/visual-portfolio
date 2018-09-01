import {connect} from 'react-redux';
import React, { Component } from 'react';
import {viewRoute} from "../actions/session";
import Login from "./Login";

// export function requireAuthentication(Component) {
//
//   class AuthenticatedComponent extends React.Component {
//
//     componentWillMount() {
//       this.checkAuth();
//     }
//
//     componentWillReceiveProps() {
//       this.checkAuth();
//     }
//
//     checkAuth() {
//       try {
//         jwt.verify(this.props.token, 'f_w^fy7oax5&iln&l@a4z@*m3ts584%pbx*fnxd7108$rj84t3')
//       } catch (error) {
//         store.dispatch(redirectToLogin())
//       }
//     }
//
//     render() {
//       return (
//         <div>
//             <Component {...this.props}/>
//         </div>
//       )
//     }
//   }
//
//   const mapStateToProps = (state) => ({
//     token: state.session.token,
//   });
//
//   return connect(mapStateToProps)(AuthenticatedComponent);
//
// }


class AuthenticatedComponent extends Component {

  componentWillMount() {
    this.props.viewRoute();
  }

  componentWillReceiveProps() {
    this.props.viewRoute();
  }

  render() {
    return (
      <div>
        {this.props.component}
      </div>
    )
  }
}

export default AuthenticatedComponent;

export const mapDispatchToProps = dispatch => ({
    viewRoute: () => dispatch(viewRoute())
})

export const mapStateToProps = state => ({
  token: state.session.token,
});

export const AuthContainer = connect(mapStateToProps,mapDispatchToProps)(AuthenticatedComponent);