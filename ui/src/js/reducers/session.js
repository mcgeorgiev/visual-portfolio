export const updateSession = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_REDIRECT':
      return state;
    case 'LOGIN_SUCCESSFUL':
      return Object.assign({}, state, {
        token: action.token,
      });
    case 'VIEW_ROUTE':
      return state;
    default:
      return state;
  }
};