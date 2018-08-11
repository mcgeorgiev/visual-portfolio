

import { connect } from 'react-redux';
import Login from "./components/Login";
import {activateGeod, closeGeod, loginEmailChanged} from "./actions/actions";

const mapStateToProps = (state, ownProps) => ({
  geod: state.geod,
});

const mapDispatchToProps = {
  activateGeod,
  closeGeod,
  loginEmailChanged
};

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default LoginContainer;