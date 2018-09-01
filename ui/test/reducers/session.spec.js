import {expect} from 'chai'
import deepFreeze from 'deep-freeze'
import {loginSuccessful, redirectToLogin, viewRoute} from "../../src/js/actions/session";
import {updateSession} from "../../src/js/reducers/session";
import {loginFailure} from "../../src/js/actions/actions";

const SESSION1 = {
  token: "a token"
}

const SESSION2 = {
  token: "a brand new token"
}

describe('session reducer', () => {
  it('has no session by default', () => {
    const noState = undefined
    const action = deepFreeze({type: ''})
    const initialState = updateSession(noState, action)

    expect(initialState).to.deep.equal({})
  })

  it('state not changed when redirect action is fired', () => {
    const currentState = deepFreeze(SESSION1)
    const action = deepFreeze(redirectToLogin())

    const updatedState = updateSession(currentState, action)

    expect(updatedState).to.deep.equal({
      ...SESSION1
    })
  })

  it('state not changed when view route action is fired', () => {
    const currentState = deepFreeze(SESSION1)
    const action = deepFreeze(viewRoute())

    const updatedState = updateSession(currentState, action)

    expect(updatedState).to.deep.equal({
      ...SESSION1
    })
  })

  it('token added to session state when login successful action is fired', () => {
    const currentState = deepFreeze(SESSION1)
    const action = deepFreeze(loginSuccessful(SESSION2.token))

    const updatedState = updateSession(currentState, action)

    expect(updatedState).to.deep.equal({
      ...SESSION1,
      token: SESSION2.token
    })
  })
})