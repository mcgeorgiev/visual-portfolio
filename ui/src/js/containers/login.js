import { connect } from 'react-redux'
import Login from '../components/Login'
import { loginEmailChanged, loginPasswordChanged, onLoginDetailsSubmitted } from '../actions/login'

const mapStateToProps = state => {
  return {
    email: state.login.email,
    password: state.login.password,
    error: state.login.error
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    loginEmailChanged: email => dispatch(loginEmailChanged(email)),
    loginPasswordChanged: password => dispatch(loginPasswordChanged(password)),
    onLoginDetailsSubmitted: () => dispatch(onLoginDetailsSubmitted())
  }
}

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default LoginContainer
