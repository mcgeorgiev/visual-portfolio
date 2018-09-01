import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {onLoginDetailsSubmitted} from "../actions/actions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      alert: ''
    };
    this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
  }

  handleChange = (input) => (event) => {
    input.eventHandler(event.target.value)
  };

  submitLoginCredentials() {
    this.setState({
      alert: (((this.state.email === '') || (this.state.password === '')) ? 'Please enter a password and email address.' : '')
    });
  }

  render() {
    return (
      <div>
        <h2>Login</h2>
        <div className="alert">
          {this.state.alert}
        </div>
        <form className='login'>
          <input type="text" name="email" onBlur={this.handleChange({eventHandler: this.props.loginEmailChanged})}/>
          <input type="password" name="password" onBlur={this.handleChange({eventHandler: this.props.loginPasswordChanged})}/>
          <button type="button" color="primary" onClick={this.props.onLoginDetailsSubmitted}>primary</button>
        </form>
      </div>
    );
  }
}

export default Login;
