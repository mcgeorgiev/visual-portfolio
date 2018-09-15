export const redirectToLogin = () => ({
  type: 'LOGIN_REDIRECT'
});

export const loginSuccessful = token => ({
  type: 'LOGIN_SUCCESSFUL',
  token,
});

export  const viewRoute = () => ({
  type: 'VIEW_ROUTE'
});