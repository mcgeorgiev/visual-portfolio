import React from 'react';
import axios from 'axios';

it('renders the Header wrapper', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find(Header)).to.have.length(1);
});
