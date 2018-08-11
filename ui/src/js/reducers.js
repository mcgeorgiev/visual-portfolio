import {combineReducers} from "redux";

export const login = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_EMAIL_CHANGED':
      return Object.assign({}, state, {
          email: action.email,
      });
    case 'LOGIN_PASSWORD_CHANGED':
      return Object.assign({}, state, {
        password: action.password,
      });
    default:
      return state;
  }
};

export const reducers = combineReducers({
  login,
});