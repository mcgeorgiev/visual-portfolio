import {expectSaga} from "redux-saga-test-plan";
import {signupErrorMessage, signupSubmitted} from "../src/js/actions/signup";
import {watchForSignupSubmitted} from "../src/js/sagas/signup";
import {selectSignupDetails} from "../src/js/selectors";
import {select} from "redux-saga/effects";
import {push} from 'react-router-redux'
import {expect} from "chai";
import * as matchers from 'redux-saga-test-plan/matchers'
import fetch from 'node-fetch'
import {throwError} from 'redux-saga-test-plan/providers';


const buildApiResponse =
  ({
     ok = true,
     body = '{}',
     status = 200,
     entity = {},
     error = null
   } = {}) => {
    return {
      ok,
      body,
      status,
      entity,
      error
    }
  }

const DETAILS = {
  user: {
    email: 'email@email.com',
    password: 'secretpassword'
  },
  full_name: 'joe bloggs'
}

const request = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(DETAILS)
}

describe('Signup saga', () => {

  it('dispatches push to /login page when user signs up successfully', () => {
    return expectSaga(watchForSignupSubmitted)
      .provide([
        [select(selectSignupDetails), DETAILS],
        [matchers.call.fn(fetch, 'http://signup.com/user', request), buildApiResponse({
          ok: true,
          status: 201
        })]
      ])
      .put(push('/login'))
      .dispatch(signupSubmitted())
      .silentRun()
  })

  it('dispatches already in use error message when signup results in 409', () => {
    return expectSaga(watchForSignupSubmitted)
      .provide([
        [select(selectSignupDetails), DETAILS],
        [matchers.call.fn(fetch, 'http://signup.com/user', request), buildApiResponse({
          ok: false,
          status: 409
        })]
      ])
      .put(signupErrorMessage('This email address is already in use.'))
      .dispatch(signupSubmitted())
      .silentRun()
  })

  it('dispatches bad request error message when signup results in 400', () => {
    return expectSaga(watchForSignupSubmitted)
      .provide([
        [select(selectSignupDetails), DETAILS],
        [matchers.call.fn(fetch, 'http://signup.com/user', request), buildApiResponse({
          ok: false,
          status: 400
        })]
      ])
      .put(signupErrorMessage('Invalid data sent.'))
      .dispatch(signupSubmitted())
      .silentRun()
  })

  it('dispatches ? error message when error thrown', () => {
    return expectSaga(watchForSignupSubmitted)
      .provide([
        [select(selectSignupDetails), DETAILS],
        [matchers.call.fn(fetch, 'http://signup.com/user', request), throwError(new Error())]])
      .put(signupErrorMessage('Something went wrong, please try again.'))
      .dispatch(signupSubmitted())
      .silentRun()
  })
})