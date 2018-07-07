import React from 'react';
import axios from 'axios';
import Login from './Login';
import Landing from './Landing';
import { spy } from 'sinon';

global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();

describe('<Landing />', () => {
  it('renders the Login wrapper', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find(Login)).to.have.length(1);
  });

  it('renders an email input', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find({name: 'email'})).to.have.length(1);
  });

  it('renders a password input', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find({name: 'password'})).to.have.length(1);
  });

  it('renders a password input', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find({name: 'password'})).to.have.length(1);
  });
});

describe('Login input', () => {
  it('should set email in Login Component', () => {
    const wrapper = shallow(<Login />);
    wrapper.find({name: 'email'}).simulate('change', {target: {name: 'email', value: 'example@example.com'}});
    expect(wrapper.state('email')).equal('example@example.com');
  });

  it('should set password in Login Component', () => {
    const wrapper = shallow(<Login />);
    wrapper.find({name: 'password'}).simulate('change', {target: {name: 'password', value: 'pwd'}});
    expect(wrapper.state('password')).equal('pwd');
  });

  it('submit event when click submit', () => {
    const submit = spy(Login.prototype, 'submitLoginCredentials');
    const loginComponent = shallow(<Login />);
    loginComponent.find('.login').simulate('submit');
    expect(submit).to.have.property('callCount', 1);
  });

})
