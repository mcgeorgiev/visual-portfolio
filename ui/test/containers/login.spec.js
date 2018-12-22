import { spy } from 'sinon'
import { mapDispatchToProps } from '../../src/js/containers/login'
import { loginEmailChanged, loginPasswordChanged, onLoginDetailsSubmitted } from '../../src/js/actions/login'

describe('<Login /> ', () => {
  it('triggers email changed action when email is changed', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.loginEmailChanged('email@example.com')

    expect(dispatch.calledWith(loginEmailChanged('email@example.com'))).toBeTruthy()
  })

  it('triggers password changed action when password is changed', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.loginPasswordChanged('Password123')

    expect(dispatch.calledWith(loginPasswordChanged('Password123'))).toBeTruthy()
  })

  it('triggers submit clicked action when button is clicked', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.onLoginDetailsSubmitted()

    expect(dispatch.calledWith(onLoginDetailsSubmitted())).toBeTruthy()
  })
})
