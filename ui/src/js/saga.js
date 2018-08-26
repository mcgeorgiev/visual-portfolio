import { call, put, takeLatest, select } from 'redux-saga/effects'
import fetch from 'node-fetch'
import "regenerator-runtime/runtime";
import {getEmail, selector, selectLoginDetails} from "./selectors";
import {loginFailure, loginSuccessful} from "./actions/actions";
import { push } from 'react-router-redux'


const goToDashboard = () => push('/dashboard');

const createLoginRequest = (loginDetails) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginDetails)
  }
}

export function* loginUser() {

  const loginDetails = yield select(selectLoginDetails);

  const loginRequest = yield createLoginRequest(loginDetails)

  try {
    const response = yield call(fetch, "http://localhost:5000/auth", loginRequest)

    if (response.ok) {
      yield put(loginSuccessful())
      yield put(goToDashboard())
    } else {
      yield put(loginFailure())
    }
  } catch (error) {
    yield put(loginFailure())
  }

  // const user = yield call(fetchAUser, selected);
    // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
}

 export function* watchForLoginSubmitted() {
  yield takeLatest("LOGIN_DETAILS_SUBMITTED", loginUser);
}

