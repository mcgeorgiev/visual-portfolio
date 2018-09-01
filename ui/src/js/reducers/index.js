import {updateLogin} from "./login";
import {updateSession} from "./session";
import {combineReducers} from "redux";

export const reducers = combineReducers({
  login: updateLogin,
  session: updateSession
});