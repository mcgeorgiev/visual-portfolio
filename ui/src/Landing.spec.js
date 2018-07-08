import React from 'react';
import axios from 'axios';
import Login from './Login';
import Landing from './Landing';
import { spy, stub } from 'sinon';

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
  const onClick = spy(Login.prototype, 'submitLoginCredentials');



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
    const loginComponent = shallow(<Login />);
    loginComponent.find('button').simulate('click');
    expect(Login.prototype.submitLoginCredentials.calledOnce).to.equal(true);

  });

  it('flash no details entered on submit of empty email fields', () => {
    const loginComponent = shallow(<Login />);
    expect(loginComponent.state('email')).equal('');
    loginComponent.find('button').simulate('click');
    expect(loginComponent.find('.alert').text()).to.equal('Please enter a password and email address.');
  });

  it('flash no "no details" error when submitting filled fields', () => {
    const loginComponent = shallow(<Login />);
    loginComponent.find({name: 'email'}).simulate('change', {target: {name: 'email', value: 'example@example.com'}});
    loginComponent.find({name: 'password'}).simulate('change', {target: {name: 'password', value: 'pwd'}});
    loginComponent.find('button').simulate('click');
    expect(loginComponent.find('.alert').text()).to.not.equal('Please enter a password and email address.');
  });

  // any empty fields -> flash fill field message

  // submit successfully -> redirect

  // submit unsucessfully -> flash incorrect

})
