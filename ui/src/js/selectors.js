import { createSelector } from 'reselect'

const selectLogin = state => state.login;

export const selectLoginDetails = createSelector(
  selectLogin,
  login => {
    return {username: login.email, password: login.password}
  }
)

const selectSession = state => state.session;

export const selectToken = createSelector(
  selectSession,
  session => {
    return {token: session.token}
  }
)

