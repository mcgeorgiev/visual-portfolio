import React from 'react';
import Login from '../src/js/components/Login';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import {expect} from 'chai'

configure({adapter: new Adapter()});

describe('<Login /> ', () => {

  it('email changed handler called when input is changed', () => {
    const emailChangedHandler = spy()
    const wrapper = mount(<Login loginEmailChanged={emailChangedHandler} />)
    const input = wrapper.find({name: 'email'})
    input.instance().value = 'email@example.com'
    //
    input.simulate('change')
    expect(emailChangedHandler.calledWith('email@example.com')).to.equal(true)
  })


  it('password changed handler called when input is changed', () => {
    const passwordChangedHandler = spy()
    const wrapper = mount(<Login loginPasswordChanged={passwordChangedHandler} />)
    const input = wrapper.find({name: 'password'})
    input.instance().value = 'Password123'
    //
    input.simulate('change')
    expect(passwordChangedHandler.calledWith('Password123')).to.be.true
  })

  it('submit login details handler called when form submitted with data', () => {
    const onLoginDetailsSubmitted = spy()
    const wrapper = mount(<Login onLoginDetailsSubmitted={onLoginDetailsSubmitted} />)

    const onSubmitHandler = wrapper.find('button').prop('onClick')
    onSubmitHandler({
      preventDefault: spy()
    })

    expect(onLoginDetailsSubmitted.called).to.be.true
  })
})