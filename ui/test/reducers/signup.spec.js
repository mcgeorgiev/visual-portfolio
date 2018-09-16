import {expect} from "chai";
import deepFreeze from "deep-freeze";
import {updateSignup} from "../../src/js/reducers/signup";
import {
  signupEmailChanged, signupErrorMessage, signupFullNameChanged, signupPasswordChanged,
  signupSubmitted
} from "../../src/js/actions/signup";
import {loginEmailChanged} from "../../src/js/actions/login";
import {updateLogin} from "../../src/js/reducers/login";

const INITIAL = {
  email: '',
  password: '',
  fullName: '',
  error: ''
}

const USER = {
  email: 'example@example.com',
  password: 'asdasda',
  fullName: 'joe blogs',
  error: 'an error has occurr'
}

describe('signup reducer', () => {
  it('has no signup state by default', () => {
    const noState = undefined
    const action = deepFreeze({type: ''})
    const initialState = updateSignup(noState, action)

    expect(initialState).to.deep.equal({})
  })

  it('state not changed when signupSubmitted action is fired', () => {
    const currentState = deepFreeze(INITIAL)
    const action = deepFreeze(signupSubmitted())

    const updatedState = updateSignup(currentState, action)

    expect(updatedState).to.deep.equal({
      ...INITIAL
    })
  })

  it('state changed when signupErrorMessage action is fired', () => {
    const currentState = deepFreeze(INITIAL)
    const action = deepFreeze(signupErrorMessage(USER.error))

    const updatedState = updateSignup(currentState, action)

    expect(updatedState).to.deep.equal({
      ...INITIAL,
      error: USER.error
    })
  })

  it('only changes email in signup state when email action is fired', () => {
    const currentState = deepFreeze(INITIAL)
    const action = deepFreeze(signupEmailChanged(USER.email))

    const updatedState = updateSignup(currentState, action)

    expect(updatedState).to.deep.equal({
      ...INITIAL,
      email: USER.email
    })
  })

  it('only changes password in signup state when password action is fired', () => {
    const currentState = deepFreeze(INITIAL)
    const action = deepFreeze(signupPasswordChanged(USER.password))

    const updatedState = updateSignup(currentState, action)

    expect(updatedState).to.deep.equal({
      ...INITIAL,
      password: USER.password
    })
  })

  it('only changes full name in signup state when full name action is fired', () => {
    const currentState = deepFreeze(INITIAL)
    const action = deepFreeze(signupFullNameChanged(USER.fullName))

    const updatedState = updateSignup(currentState, action)

    expect(updatedState).to.deep.equal({
      ...INITIAL,
      fullName: USER.fullName
    })
  })
})