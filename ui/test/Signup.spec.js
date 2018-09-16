import React, { cloneElement } from 'react'
import { spy } from 'sinon'
import Adapter from 'enzyme-adapter-react-16'
import { mount, shallow, configure } from 'enzyme'
import { expect } from 'chai'
import { MemoryRouter } from 'react-router-dom'
import deepFreeze from 'deep-freeze'
import Signup from "../src/js/components/Signup";
import {signupSubmitted} from "../src/js/actions/signup";

configure({ adapter: new Adapter() })

describe('<Signup /> ', () => {
  it('email changed handler called when input is changed', () => {
    const emailChangedHandler = spy()
    const wrapper = mount(
      <MemoryRouter>
        <Signup signupEmailChanged={emailChangedHandler} />
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
        <Signup signupPasswordChanged={passwordChangedHandler} />
      </MemoryRouter>
    )
    const input = wrapper.find({ name: 'password' })
    input.instance().value = 'Password123'

    input.simulate('change')
    expect(passwordChangedHandler.calledWith('Password123')).to.be.true
  })

  it('fullName changed handler called when fullName is changed', () => {
    const fullNameChangedHandler = spy()
    const wrapper = mount(
      <MemoryRouter>
        <Signup signupFullNameChanged={fullNameChangedHandler} />
      </MemoryRouter>
    )
    const input = wrapper.find({ name: 'fullname' })
    input.instance().value = 'joe bloggs'

    input.simulate('change')
    expect(fullNameChangedHandler.calledWith('joe bloggs')).to.be.true
  })

  it('submit signup details handler called when form submitted with data', () => {
    const onSignupDetailsSubmitted = spy()
    const wrapper = mount(
      <MemoryRouter>
        <Signup signupSubmitted={onSignupDetailsSubmitted} />
      </MemoryRouter>
    )
    const onSubmitHandler = wrapper.find('button').prop('onClick')
    onSubmitHandler({
      preventDefault: spy()
    })

    expect(onSignupDetailsSubmitted.called).to.be.true
  })

  it('error alert area updates when there are errors', () => {
    const wrapper = mount(<MemoryRouter><Signup /></MemoryRouter>)
    const alert = wrapper.find('.alert')
    expect(alert.html()).to.not.contain('Incorrect email or password entered.')

    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { error: 'This email address is already in use.' })
    })

    expect(alert.html()).to.contain('This email address is already in use.')
  })

  it('toggles eye image by when clicking image ', () => {
    const wrapper = mount(<MemoryRouter><Signup /></MemoryRouter>)
    const img = wrapper.find('.show-password-icon')
    img.simulate('click')
    const img2 = wrapper.find('.show-password-icon')
    expect(img).to.not.equal(img2)
  })

  it('toggles password visible when clicking image ', () => {
    const wrapper = mount(<MemoryRouter><Signup /></MemoryRouter>)
    const img = wrapper.find('.show-password-icon')

    const passwordType = wrapper.find({ name: 'password' })
    expect(passwordType.html()).to.contain('type="password"')

    img.simulate('click')
    expect(wrapper.find({ name: 'password' }).html()).to.contain('type="text"')
  })
})