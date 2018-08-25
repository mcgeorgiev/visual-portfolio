import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import "regenerator-runtime/runtime";

function fetchAUser(payload) {
  console.log("this is a saga")
}
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
    const user = yield call(fetchAUser, undefined);
    // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("LOGIN_EMAIL_CHANGED", fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest("LOGIN_EMAIL_CHANGED", fetchUser);
}

export default mySaga