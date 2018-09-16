import {spy} from "sinon";
import {expect} from "chai";
import {mapDispatchToProps} from "../../src/js/containers/signup";
import {
  signupEmailChanged, signupErrorMessage, signupFullNameChanged,
  signupPasswordChanged, signupSubmitted
} from "../../src/js/actions/signup";

describe('<Signup /> ', () => {
  it('triggers email changed action when email is changed', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.signupEmailChanged('email@example.com')

    expect(dispatch.calledWith(signupEmailChanged('email@example.com'))).to.be.true
  })

  it('triggers password changed action when password is changed', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.signupPasswordChanged('Password123')

    expect(dispatch.calledWith(signupPasswordChanged("Password123"))).to.be.true
  })

  it('triggers fullName changed action when fullName is changed', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.signupFullNameChanged('joe bloggs')

    expect(dispatch.calledWith(signupFullNameChanged("joe bloggs"))).to.be.true
  })

  it('triggers error changed action when error is changed', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.signupErrorMessage('joe bloggs')

    expect(dispatch.calledWith(signupErrorMessage("joe bloggs"))).to.be.true
  })

  it('triggers submit clicked action when button is clicked', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.signupSubmitted()

    expect(dispatch.calledWith(signupSubmitted())).to.be.true
  })
})