import {watchForLoginSubmitted, watchForProtectedRedirect, watchForViewRoute} from "./saga";
import {watchForSignupSubmitted} from "./signup";

export default function* () {
  yield [
    watchForProtectedRedirect(),
    watchForLoginSubmitted(),
    watchForViewRoute(),
    watchForSignupSubmitted()
  ]
}