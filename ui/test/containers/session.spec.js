import { spy } from 'sinon'
import { mapDispatchToProps } from '../../src/js/components/Auth'
import { viewRoute } from '../../src/js/actions/session'

describe('<Auth /> ', () => {
  it('triggers viewRoute when route accessed', () => {
    const dispatch = spy()
    const dispatchProps = mapDispatchToProps(dispatch)

    dispatchProps.viewRoute()

    expect(dispatch.calledWith(viewRoute())).toBeTruthy()
  })
})
