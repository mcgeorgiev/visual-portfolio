import { createSelector } from 'reselect'

const selectLogin = state => state.login;

export const selectLoginDetails = createSelector(
  selectLogin,
  login => {
    return {username: login.email, password: login.password}
  }
)
