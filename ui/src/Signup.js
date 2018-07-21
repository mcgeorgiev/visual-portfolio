import React, { Component } from 'react';
const eye = require('./css/styles/images/eye.svg');
const eyeOff = require('./css/styles/images/eye-off.svg');

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      password: '',
      showPassword: 'password',
      eyeIcon: eye
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: this.state.showPassword === 'text' ? 'password' : 'text',
      eyeIcon: this.state.eyeIcon === eye ? eyeOff : eye
    });
  };

  submitCredentials = () => {
    this.setState({
      alert: (((this.state.fullname === '') ||
               (this.state.email === '') ||
               (this.state.password === '')) ? 'Please enter all fields.' : '')
    });

    if (this.createAccount() === 409) {
      this.setState({
        alert: 'This email address is already in use.'
      });
    }
  };

  createAccount = () => {

  };

render() {
    return (
      <div className='signup landing-form'>
        <h2>Sign Up</h2>
        <div className="alert">
          {this.state.alert}
        </div>
        <form className='signup'>
          <input type="text" name="fullname" onChange={this.handleInputChange} placeholder='Full Name'/>
          <input type="text" name="email" onChange={this.handleInputChange} placeholder='Email'/>
          <img src={this.state.eyeIcon} onClick={this.toggleShowPassword} className='show-password-icon'/>
          <input type={this.state.showPassword} name="password" onChange={this.handleInputChange} placeholder='Password' />
          <button type="button" onClick={this.submitCredentials}>SIGN ME UP</button>
        </form>
        <div className='terms-conditions'>
          By signing up, you agree to our <b>Terms</b>. Learn how we collect, use and share your data in out <b>Data Policy</b> and how we use cookies and similar technology in out <b>Cookies Policy</b>.
        </div>
      </div>
    );
  }
}

export default Signup;
