import { createSelector } from 'reselect'

const selectLogin = state => state.login;

export const selectLoginEmail = createSelector(
  selectLogin,
  login => login.email
);

// export const selectLoginDetails = createSelector(
//   selectLogin,
//   login => login
// )

export const selectLoginDetails = createSelector(
  selectLogin,
  login => {
    return {username: login.email, password: login.password}
  }
)