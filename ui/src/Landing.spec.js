import React from 'react';
import axios from 'axios';
import Login from './Login';
import Landing from './Landing';

describe('<Landing />', () => {
  it('renders the Login wrapper', () => {
    const wrapper = shallow(<Landing />);
    expect(wrapper.find(Login)).to.have.length(1);
  });
});
