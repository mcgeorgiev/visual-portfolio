import {watchForLoginSubmitted, watchForProtectedRedirect} from "./saga";

export default function* () {
  yield [
    watchForProtectedRedirect(),
    watchForLoginSubmitted()
  ]
}