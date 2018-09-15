import React, { Component } from 'react';
import {Link} from "react-router-dom";

const eye = require('../../css/styles/images/eye.svg')
const eyeOff = require('../../css/styles/images/eye-off.svg')

class Login extends Component {
  constructor() {
    super()
    this.state = {
      eyeIcon: eye,
      showPassword: 'password'
    }
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
      <div className='form landing-form'>
        <h2>Login</h2>
        <div className="alert">
          {this.props.error}
        </div>
        <form className='form'>
          <input type="text" name="email" onChange={this.handleChange({eventHandler: this.props.loginEmailChanged})} placeholder='Email'/>
          <img src={this.state.eyeIcon} onClick={this.toggleShowPassword} className='show-password-icon'/>
          <input type={this.state.showPassword} name="password"  onChange={this.handleChange({eventHandler: this.props.loginPasswordChanged})} placeholder='Password'/>
          <button className='signup-button' type="button" color="primary" onClick={this.props.onLoginDetailsSubmitted}>LOGIN</button>
          <p className="center">First time here? <Link to="/"><b>Sign up</b></Link></p>
        </form>
      </div>
    );
  }
}

export default Login;
