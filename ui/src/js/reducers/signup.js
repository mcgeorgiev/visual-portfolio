export const updateSignup = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNUP_SUBMITTED':
      return state;
    case 'SIGNUP_ERROR':
      return Object.assign({}, state, {
        error: action.error,
      });
    case 'SIGNUP_EMAIL_CHANGED':
      return Object.assign({}, state, {
        email: action.email,
      });
    case 'SIGNUP_PASSWORD_CHANGED':
      return Object.assign({}, state, {
        password: action.password,
      });
    case 'SIGNUP_FULLNAME_CHANGED':
      return Object.assign({}, state, {
        fullName: action.fullName,
      });
    default:
      return state;
  }
};