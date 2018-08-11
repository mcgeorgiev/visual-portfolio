// reducers.js
import {combineReducers} from "redux";
import {handleActions} from "redux-actions";
import {loginEmailChanged} from "./actions/actions";

export const geod = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_EMAIL_CHANGED':
      console.log(action);
      return action.email;
    case 'LOGIN_PASSWORD_CHANGED':
      return action.password;
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