import { call, put, takeLatest, select } from 'redux-saga/effects'
import fetch from 'node-fetch'
import "regenerator-runtime/runtime";
import {selectLoginDetails, selectToken} from "../selectors";
import { push } from 'react-router-redux'
import {loginFailure} from "../actions/actions";
import {loginSuccessful} from "../actions/session";
import * as jwt from "jsonwebtoken";


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

const parseBody = response => { return response.json() }

export function* loginUser() {

  const loginDetails = yield select(selectLoginDetails);
  const loginRequest = yield createLoginRequest(loginDetails)

  try {
    const response = yield call(fetch, "http://localhost:8000/api-token-auth/", loginRequest)

    if (response.ok) {
      const jwt = yield parseBody(response)
      yield put(loginSuccessful(jwt.token))
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

const goToLogin = () => push('/login')

export function* protectedRedirect() {
  yield put(goToLogin())
}

export function* watchForProtectedRedirect() {
  yield takeLatest("LOGIN_REDIRECT", protectedRedirect);
}

const verifyToken = token => jwt.verify(token, process.env.SECRET_KEY)

export function* validateSession() {
  const session = yield select(selectToken);
  try {
    yield put(verifyToken(session.token))
  } catch (err) {
    yield put(goToLogin())
  }
}

export function* watchForViewRoute() {
  yield takeLatest("VIEW_ROUTE", validateSession);
}
