import {watchForLoginSubmitted, watchForProtectedRedirect, watchForViewRoute} from "./saga";

export default function* () {
  yield [
    watchForProtectedRedirect(),
    watchForLoginSubmitted(),
    watchForViewRoute()
  ]
}