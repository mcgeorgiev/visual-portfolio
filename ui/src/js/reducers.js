// reducers.js
import {combineReducers} from "redux";

export const geod = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_EMAIL_CHANGED':
      return Object.assign({}, state, {
          email: action.email,
      });
    case 'LOGIN_PASSWORD_CHANGED':
      return Object.assign({}, state, {
        password: action.password,
      });
    case 'ACTIVATE_GEOD':
      return action.geod;
    case 'CLOSE_GEOD':
      return {};
    default:
      return state;
  }
};

export const reducers = combineReducers({
  geod,
});