import { call, put, takeLatest, select } from 'redux-saga/effects'
import fetch from 'node-fetch'
import "regenerator-runtime/runtime";
import { push } from 'react-router-redux'
import {selectSignupDetails} from "../selectors";
import {signupErrorMessage} from "../actions/signup";

const createSignupRequest = (signupDetails) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(signupDetails)
  }
}

export function* signup () {
  const [signupDetails] = yield [
    select(selectSignupDetails)
  ]

  const request = yield createSignupRequest(signupDetails)
  try {
    const response = yield call(fetch, "http://localhost:8000/user", request)
    if (response.ok) {
      yield put(push('/dashboard'))
    } else if (response.status === 409) {
      yield put(signupErrorMessage('This email address is already in use.'))
    } else if (response.status === 400) {
      yield put(signupErrorMessage('Invalid data sent.'))
    }
  } catch (error) {
    yield put(signupErrorMessage('Something went wrong, please try again.'))
  }
}

export function* watchForSignupSubmitted() {
  yield takeLatest("SIGNUP_SUBMITTED", signup);
}
