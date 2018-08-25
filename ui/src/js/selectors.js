import { createSelector } from 'reselect'

const selectLogin = state => state.login;

export const selectLoginEmail = createSelector(
  selectLogin,
  login => login.email
);