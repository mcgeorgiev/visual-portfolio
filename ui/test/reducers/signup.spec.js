import {expect} from "chai";
import deepFreeze from "deep-freeze";
import {updateSignup} from "../../src/js/reducers/signup";
import {signupSubmitted} from "../../src/js/actions/signup";

const SIGNUP = {
  email: '',
  password: '',
  fullName: ''
}

describe('signup reducer', () => {
  it('has no signup state by default', () => {
    const noState = undefined
    const action = deepFreeze({type: ''})
    const initialState = updateSignup(noState, action)

    expect(initialState).to.deep.equal({})
  })

  it('state not changed when signupSubmitted action is fired', () => {
    const currentState = deepFreeze(SIGNUP)
    const action = deepFreeze(signupSubmitted())

    const updatedState = updateSignup(currentState, action)

    expect(updatedState).to.deep.equal({
      ...SIGNUP
    })
  })
})