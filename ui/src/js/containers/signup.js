import { connect } from 'react-redux';
import Signup from "../components/Signup";
import {
  signupEmailChanged, signupErrorMessage, signupFullNameChanged, signupPasswordChanged,
  signupSubmitted
} from "../actions/signup";

const mapStateToProps = state => {
  return {
    email: state.signup.email,
    password: state.signup.password,
    error: state.signup.error
  }
};

export const mapDispatchToProps = dispatch => {
  return {
    signupEmailChanged: email => dispatch(signupEmailChanged(email)),
    signupPasswordChanged: password => dispatch(signupPasswordChanged(password)),
    signupErrorMessage: error => dispatch(signupErrorMessage(error)),
    signupSubmitted: () => dispatch(signupSubmitted())
  }
};

const SignupContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

export default SignupContainer;