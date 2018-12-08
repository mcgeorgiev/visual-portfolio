import React, {
  Component
} from 'react';
import {
    Link, NavLink
} from "react-router-dom";

const eye = require('../../css/styles/images/eye.svg');
const eyeOff = require('../../css/styles/images/eye-off.svg');


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      showPassword: 'password',
      eyeIcon: eye,
    };
  }

  handleChange = (input) => (event) => {
    input.eventHandler(event.target.value)
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: this.state.showPassword === 'text' ? 'password' : 'text',
      eyeIcon: this.state.eyeIcon === eye ? eyeOff : eye
    })
  }

  render() {
    return (
      <div>
        <h2>Sign up for Portfolio</h2>
        <div className="alert">
          {this.props.error}
        </div>
        <form className='form'>
          <input type="text" name="email"
                 onChange={this.handleChange({eventHandler: this.props.signupEmailChanged})}
                 placeholder='Email'/>
          <img src={this.state.eyeIcon} onClick={this.toggleShowPassword} className='show-password-icon'/>
          <input type={this.state.showPassword} name="password"
                 onChange={this.handleChange({eventHandler: this.props.signupPasswordChanged})}
                 placeholder='Password'/>
          <button type="button" className='signup-button' onClick={this.props.signupSubmitted}>
            SIGN ME UP
          </button>
          <p className="center"> Not the first time here ? <NavLink to="/login"> < b> Log in </b></NavLink></p>
          <div className='terms-conditions'> By signing up, you agree to our <b>Terms</b>. Learn how we collect, use and share your data in out <b>Data Policy</b> and how we use cookies and similar technology in out <b>Cookies Policy</b>. </div>
        </form>
      </div>
    );
  }
}

export default Signup;