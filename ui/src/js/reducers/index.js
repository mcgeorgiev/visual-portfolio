import {updateLogin} from "./login";
import {updateSession} from "./session";
import {combineReducers} from "redux";
import {updateSignup} from "./signup";

export const reducers = combineReducers({
  login: updateLogin,
  session: updateSession,
  signup: updateSignup
});