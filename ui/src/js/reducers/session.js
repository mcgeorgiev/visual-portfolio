export const updateSession = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_REDIRECT':
      return state;
    case 'LOGIN_SUCCESSFUL':
      return Object.assign({}, state, {
        token: action.token,
      });
    default:
      return state;
  }
};