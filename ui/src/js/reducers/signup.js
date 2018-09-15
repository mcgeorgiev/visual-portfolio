export const updateSignup = (state = {}, action) => {
  switch (action.type) {
    case 'SIGNUP_SUBMITTED':
      return state;
    case 'SIGNUP_ERROR':
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
};