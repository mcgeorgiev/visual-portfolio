import { createSelector } from 'reselect'

const selectLogin = state => state.login

export const selectLoginDetails = createSelector(
  selectLogin,
  login => {
    return { email: login.email, password: login.password }
  }
)

const selectSession = state => state.session

export const selectToken = createSelector(
  selectSession,
  session => {
    return { token: session.token }
  }
)

const selectSignup = state => state.signup

export const selectSignupDetails = createSelector(
  selectSignup,
  signup => {
    return {
      email: signup.email,
      password: signup.password
    }
  }
)
