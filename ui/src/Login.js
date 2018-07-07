import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
    this.submitLoginCredentials = this.submitLoginCredentials.bind(this);
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitLoginCredentials() {
    console.log("clicked");
  }

  render() {
    return (
      <div>
        <form className='login' onSubmit={this.submitLoginCredentials}>
          <input type="text" name="email" onChange={this.handleInputChange}/>
          <input type="password" name="password" onChange={this.handleInputChange}/>
          <input type="submit" value="Login"/>
        </form>
      </div>
    );
  }
}

export default Login;
