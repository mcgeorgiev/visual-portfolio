import { connect } from 'react-redux';
import Login from "./components/Login";
import {loginEmailChanged, loginPasswordChanged} from "./actions/actions";

const mapStateToProps = (state) => {
  return {
    email: state.login.email,
    password: state.login.password,
  }
};

const mapDispatchToProps = {
  loginEmailChanged,
  loginPasswordChanged,
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;