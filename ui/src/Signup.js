import React, { Component } from 'react';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      password: '',
      showPassword: 'password',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  toggleShowPassword = () => {
    this.setState({
      showPassword: this.state.showPassword === 'text' ? 'password' : 'text'
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
      <div>
        <h2>Signup</h2>
        <div className="alert">
          {this.state.alert}
        </div>
        <form className='signup'>
          <input type="text" name="fullname" onChange={this.handleInputChange} />
          <input type="text" name="email" onChange={this.handleInputChange} />
          <img srcclassName='showPasswordButton' onClick={this.toggleShowPassword}>Toggle</img>
          <input type={this.state.showPassword} name="password" onChange={this.handleInputChange} />
          <button type="button" onClick={this.submitCredentials}>Signup</button>
        </form>
      </div>
    );
  }
}

export default Signup;
