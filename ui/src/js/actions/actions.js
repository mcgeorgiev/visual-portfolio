export const loginEmailChanged = email => ({
  type: 'LOGIN_EMAIL_CHANGED',
  email,
});

export const loginPasswordChanged = password => ({
  type: 'LOGIN_PASSWORD_CHANGED',
  password,
});

export const onLoginDetailsSubmitted = () => ({
  type: 'LOGIN_DETAILS_SUBMITTED'
});