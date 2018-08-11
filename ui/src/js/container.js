

import { connect } from 'react-redux';
import Login from "./components/Login";
import {activateGeod, closeGeod, loginEmailChanged, loginPasswordChanged} from "./actions/actions";

const mapStateToProps = (state, ownProps) => ({
  geod: state.geod,
  email: state.email,
  password: state.password
});

const mapDispatchToProps = {
  activateGeod,
  closeGeod,
  loginEmailChanged,
  loginPasswordChanged,
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;