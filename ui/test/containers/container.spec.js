import { spy } from 'sinon';
import {expect} from 'chai'
import {mapDispatchToProps} from "../../src/js/containers/container";
import {loginEmailChanged, loginPasswordChanged, onLoginDetailsSubmitted} from "../../src/js/actions/actions";

describe('<Login /> ', () => {
  it('triggers email changed action when email is changed', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.loginEmailChanged('email@example.com')

    expect(dispatch.calledWith(loginEmailChanged('email@example.com'))).to.be.true
  })

  it('triggers password changed action when password is changed', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.loginPasswordChanged('Password123')

    expect(dispatch.calledWith(loginPasswordChanged("Password123"))).to.be.true
  })

  it('triggers submit clicked action when button is clicked', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.onLoginDetailsSubmitted()

    expect(dispatch.calledWith(onLoginDetailsSubmitted())).to.be.true
  })
})