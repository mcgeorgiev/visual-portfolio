import React from 'react';
import Login from '../src/js/components/Login';
import { spy } from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';

configure({adapter: new Adapter()});

describe('<Login /> ', () => {
  describe('email ', () => {

    it('changed handler called when input is changed', () => {
      const emailChangedHandler = spy()
      const wrapper = mount(<Login loginEmailChanged={emailChangedHandler} />)
      // const input = wrapper.find({name: 'first_name'})
      // input.instance().value = 'frodo'
      //
      // input.simulate('blur')
      //
      // assert(firstNameChangedHandler.calledWith('frodo'))
    })
  })
})