import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Login from '../src/js/components/Login';
import Signup from '../src/js/components/Signup'
import Landing from '../src/js/components/Landing';
import { spy, stub } from 'sinon';

import { BrowserRouter, Switch, Route } from 'react-router-dom';


describe('<Landing />', () => {
  it('renders the Login wrapper', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find(Login)).to.have.length(1);
  });

  it('renders the Signup wrapper', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find(Signup)).to.have.length(1);
  });

  it('renders an email input', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find({name: 'email'})).to.have.length(1);
  });

  it('renders a password input', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find({name: 'password'})).to.have.length(1);
  });
});

describe('<Signup />', () => {
  it('renders a email and password input', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find({name: 'fullname'})).to.have.length(1);
    expect(wrapper.find({name: 'email'})).to.have.length(1);
    expect(wrapper.find({name: 'password'})).to.have.length(1);
  });

  it('should set email in Login Component', () => {
    const wrapper = shallow(<Signup />);
    wrapper.find({name: 'email'}).simulate('change', {target: {name: 'email', value: 'example@example.com'}});
    expect(wrapper.state('email')).equal('example@example.com');
  });

  it('should toggle show password when icon clicked', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.find({name: 'password'}).prop('type')).equal('password');
    wrapper.find('.showPasswordButton').simulate('click');
    expect(wrapper.find({name: 'password'}).prop('type')).equal('text');
    wrapper.find('.showPasswordButton').simulate('click');
    expect(wrapper.find({name: 'password'}).prop('type')).equal('password');
  });

  it('should flash "no details" entered on submit of empty fields', () => {
    const wrapper = shallow(<Signup />);
    expect(wrapper.state('email')).equal('');
    wrapper.find('button').simulate('click');
    expect(wrapper.find('.alert').text()).to.equal('Please enter all fields.');
  });

  it('should flash error when existing email is used to create an account', () => {
    const wrapper = shallow(<Signup/>);
    stub(wrapper.instance(), 'createAccount').returns(409);

    wrapper.find({name: 'email'}).simulate('change', {target: {name: 'email', value: 'example@example.com'}});
    wrapper.find({name: 'password'}).simulate('change', {target: {name: 'password', value: 'pwd'}});
    wrapper.find({name: 'fullname'}).simulate('change', {target: {name: 'fullname', value: 'joe bloggs'}});
    wrapper.find('button').simulate('click');

    expect(wrapper.find('.alert').text()).to.equal('This email address is already in use.')
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


  // submit successfully -> redirect
  // submit unsucessfully -> flash incorrect

})
