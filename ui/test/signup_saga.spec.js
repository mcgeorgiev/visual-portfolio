import {expectSaga} from "redux-saga-test-plan";
import {signupSubmitted} from "../src/js/actions/signup";
import {watchForSignupSubmitted} from "../src/js/sagas/signup";
import {selectSignupDetails} from "../src/js/selectors";
import {select} from "redux-saga/effects";
import {push} from 'react-router-redux'
import {expect} from "chai";
import * as matchers from 'redux-saga-test-plan/matchers'
import fetch from 'node-fetch'

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

  it('dispatches push to /dashboard page when user signs up successfully', () => {
    return expectSaga(watchForSignupSubmitted)
      .provide([
        [select(selectSignupDetails), DETAILS],
        [matchers.call.fn(fetch, 'http://signup.com/user', request), buildApiResponse({
          ok: true,
          status: 201
        })]
      ])
      .put(push('/dashboard'))
      .dispatch(signupSubmitted())
      .silentRun()
  })
})