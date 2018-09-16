// import PropTypes from 'prop-types';
//
// class Greeting extends React.Component {
//   render() {
//     return (
//       <h1>Hello, {this.props.name}</h1>
//     );
//   }
// }
//
// Greeting.propTypes = {
//   name: PropTypes.string
// };

import {cloneElement} from "react";
import {expect} from "chai";
import {mount} from "enzyme/build/index";

describe('<Input />', () => {
  it('error alert area updates when there are errors', () => {
    const wrapper = mount(<MemoryRouter><Login /></MemoryRouter>)
    const alert = wrapper.find('.alert')
    expect(alert.html()).to.not.contain('Incorrect email or password entered.')

    wrapper.setProps({
      children: cloneElement(wrapper.props().children, { error: 'Incorrect email or password entered.' })
    })

    expect(alert.html()).to.contain('Incorrect email or password entered.')
  })
})