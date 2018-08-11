import { connect } from 'react-redux';
import Login from "./components/Login";
import {loginEmailChanged, loginPasswordChanged} from "./actions/actions";

const mapStateToProps = (state) => {
  // console.log("state");
  // console.log(state);
  // console.log("state-email");
  // console.log(state.email);
  // console.log("state-login");
  // console.log(state.login);
  return {
    email: state.login.email,
    password: state.login.password,
  }
};

// const mapStateToProps = (state) => {
//   return { items: state.items };
// };

const mapDispatchToProps = {
  loginEmailChanged,
  loginPasswordChanged,
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;