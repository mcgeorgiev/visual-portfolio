import React, { cloneElement } from 'react'
import Login from '../src/js/components/Login'
import { spy } from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import { mount, shallow, configure } from 'enzyme'
import { expect } from 'chai'
import { MemoryRouter } from 'react-router-dom'

configure({ adapter: new Adapter() })

describe('<Login /> ', () => {
  it('email changed handler called when input is changed', () => {
    const emailChangedHandler = spy()
    const wrapper = mount(
      <MemoryRouter>
        <Login loginEmailChanged={emailChangedHandler} />
      </MemoryRouter>
    )

    const input = wrapper.find({ name: 'email' })
    input.instance().value = 'email@example.com'

    input.simulate('change')
    expect(emailChangedHandler.calledWith('email@example.com')).to.equal(true)
  })

  it('password changed handler called when input is changed', () => {
    const passwordChangedHandler = spy()
    const wrapper = mount(
      <MemoryRouter>
        <Login loginPasswordChanged={passwordChangedHandler} />
      </MemoryRouter>
    )
    const input = wrapper.find({ name: 'password' })
    input.instance().value = 'Password123'

    input.simulate('change')
    expect(passwordChangedHandler.calledWith('Password123')).to.be.true
  })

  it('submit login details handler called when form submitted with data', () => {
    const onLoginDetailsSubmitted = spy()
    const wrapper = shallow(<Login onLoginDetailsSubmitted={onLoginDetailsSubmitted} />)

    const onSubmitHandler = wrapper.find('button').prop('onClick')
    onSubmitHandler({
      preventDefault: spy()
    })

    expect(onLoginDetailsSubmitted.called).to.be.true
  })

  it('error alert area updates when there are errors', () => {
    const wrapper = mount(<MemoryRouter><Login /></MemoryRouter>)
    const alert = wrapper.find('.alert')
    expect(alert.html()).to.not.contain('Incorrect email or password entered.')

    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { error: 'Incorrect email or password entered.' })
    })

    expect(alert.html()).to.contain('Incorrect email or password entered.')
  })

  // it('renders eye image by default ', () => {
  //   const wrapper = shallow(<Login />)
  //   // wrapper.setState({eyeIcon: eye});
  //   console.log(wrapper.state.eye)
  //   // expect(wrapper.find('#verified-success')).to.have.lengthOf(1);

  // });
})