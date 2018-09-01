export const updateLogin = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_EMAIL_CHANGED':
      return Object.assign({}, state, {
        email: action.email,
      });
    case 'LOGIN_PASSWORD_CHANGED':
      return Object.assign({}, state, {
        password: action.password,
      });
    case 'LOGIN_DETAILS_SUBMITTED':
      return state;
    case 'LOGIN_FAILURE':
      return state;
    default:
      return state;
  }
};