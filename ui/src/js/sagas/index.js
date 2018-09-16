import {watchForLoginSubmitted, watchForProtectedRedirect, watchForViewRoute} from "./login";
import {watchForSignupSubmitted} from "./signup";

export default function* () {
  yield [
    watchForProtectedRedirect(),
    watchForLoginSubmitted(),
    watchForViewRoute(),
    watchForSignupSubmitted()
  ]
}