// actions.js
export const activateGeod = geod => ({
  type: 'ACTIVATE_GEOD',
  geod,
});

export const closeGeod = () => ({
  type: 'CLOSE_GEOD',
});

export const loginEmailChanged = email => ({
  type: 'LOGIN_EMAIL_CHANGED',
  email,
});

export const loginPasswordChanged = password => ({
  type: 'LOGIN_PASSWORD_CHANGED',
  password,
});