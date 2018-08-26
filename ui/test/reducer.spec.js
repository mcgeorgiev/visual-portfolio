import {expect} from 'chai'
import deepFreeze from 'deep-freeze'
import {updateLogin} from "../src/js/reducers";
import {loginEmailChanged, loginPasswordChanged} from "../src/js/actions/actions";

const USER1 = {
  email: 'email@example.com',
  password: 'Password123'
}

const USER2 = {
  email: 'email@example.com',
  password: 'Password123'
}

describe('login reducer ', () => {
  it('has no login details by default', () => {
    const noState = undefined
    const action = deepFreeze({type: ''})
    const initialState = updateLogin(noState, action)

    expect(initialState).to.deep.equal({})
  })

  it('only changes email in login state when email action is fired', () => {
    const currentState = deepFreeze(USER1)
    const action = deepFreeze(loginEmailChanged(USER2.email))

    const updatedState = updateLogin(currentState, action)

    expect(updatedState).to.deep.equal({
      ...USER1,
      email: USER2.email
    })
  })

  it('only changes password in login state when password action is fired', () => {
    const currentState = deepFreeze(USER1)
    const action = deepFreeze(loginPasswordChanged(USER2.password))

    const updatedState = updateLogin(currentState, action)

    expect(updatedState).to.deep.equal({
      ...USER1,
      password: USER2.password
    })
  })
})