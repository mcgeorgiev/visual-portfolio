import {expect} from 'chai'
import {call, select, put} from 'redux-saga/effects'
import fetch from 'node-fetch'
import {loginUser, protectedRedirect, validateSession} from "../../src/js/sagas/login";
import {selectLoginDetails, selectToken} from "../../src/js/selectors";
import { push } from 'react-router-redux'
import {loginSuccessful} from "../../src/js/actions/session";
import * as jwt from "jsonwebtoken";
import {loginFailure} from "../../src/js/actions/login";

const TOKEN = {token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzb21lIjoicGF5bG9hZCJ9.Joh1R2dYzkRvDkqv3sygm5YyK8Gi4ShZqbhK2gxcs2U"}


export const buildApiResponse = ({
   ok = true,
   body = {},
   status = 200,
   entity = {},
   error = null,
   json = () => {return TOKEN}
  } = {}) => {
  return {
    ok,
    body,
    status,
    entity,
    error,
    json
  }
}

describe('login sagas', () => {

  describe('protectedRedirect ', () => {
    it('redirects to the Login page', () => {
      const iterator = protectedRedirect()
      expect(iterator.next().value)
        .to.deep.equal(put(push('/login')))
    })
  })

  describe('validateSession ', () => {
    it('selects the token from state', () => {
      const iterator = validateSession()
      expect(iterator.next().value)
        .to.deep.equal(select(selectToken))
    })

    it('validates a valid JWT', () => {

      process.env["SECRET_KEY"] = "secret"

      const iterator = validateSession()
      iterator.next()

      expect(iterator.next(TOKEN).value)
        .to.deep.equal(put(jwt.verify(TOKEN.token, 'secret')))
    })

    it('redirects to login if JWT is invalid', () => {

      process.env["SECRET_KEY"] = "secret"

      const iterator = validateSession()
      iterator.next()

      expect(iterator.next().value)
        .to.deep.equal(put(push('/login')))
    })
  })

  describe('loginUser ', () => {

    const LOGIN_DETAILS = {
      email: "email@example.com",
      password: "Password123"
    }

    const loginRequest = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(LOGIN_DETAILS)
    }

    it('selects the email and password from state', () => {
      const iterator = loginUser()
      expect(iterator.next().value)
        .to.deep.equal(select(selectLoginDetails))
    })

    it('creates the request to be be posted to the api', () => {
      const iterator = loginUser()
      iterator.next()

      expect(iterator.next(LOGIN_DETAILS).value)
        .to.deep.equal(loginRequest)
    })

    it('posts a call to the api using the login request', () => {
      const iterator = loginUser()
      iterator.next()
      iterator.next(LOGIN_DETAILS)

      expect(iterator.next(loginRequest).value)
        .to.deep.equal(call(fetch, 'http://localhost:8000/api-token-auth/', loginRequest))
    })

    it('extract jwt when response is ok', () => {
      const iterator = loginUser()
      iterator.next()
      iterator.next(LOGIN_DETAILS)
      iterator.next(loginRequest)

      const response = buildApiResponse({
        ok: true,
        status: 200,
      })
      expect(iterator.next(response).value).to.equal(TOKEN)

    })

    it('dispatches login succeeded action when response is ok', () => {
      const iterator = loginUser()
      iterator.next()
      iterator.next(LOGIN_DETAILS)
      iterator.next(loginRequest)

      const response = buildApiResponse({
        ok: true,
        status: 200
      })
      iterator.next(response)

      expect(iterator.next(TOKEN).value)
        .to.deep.equal(put(loginSuccessful(TOKEN.token)))
    })

    it('dispatches push to dashboard when response from api is ok', () => {
      const iterator = loginUser()
      iterator.next()
      iterator.next(LOGIN_DETAILS)
      iterator.next(loginRequest)

      const response = buildApiResponse({
        ok: true,
        status: 200
      })
      iterator.next(response)
      iterator.next(TOKEN)
      expect(iterator.next().value)
        .to.deep.equal(put(push('/dashboard')))
    })

    it('dispatches login failed action when response is not ok', () => {
      const iterator = loginUser()
      iterator.next()
      iterator.next(LOGIN_DETAILS)
      iterator.next(loginRequest)

      const response = buildApiResponse({
        ok: false,
        status: 403
      })

      expect(iterator.next(response).value)
        .to.deep.equal(put(loginFailure(true)))
    })
  })
})