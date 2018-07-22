import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitLoginCredentials() {
    this.setState({
      alert: (((this.state.email === '') || (this.state.password === '')) ? 'Please enter a password and email address.' : '')
    });

    // axios.post('https://google.com', {
    //   email: this.state.email,
    //   password: this.state.password
    // })
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

  render() {
    return (
      <div>
        <Link to='/dashboard'>Dash</Link>
        <h2>Login</h2>
        <div className="alert">
          {this.state.alert}
        </div>
        <form className='login'>
          <input type="text" name="email" onChange={this.handleInputChange}/>
          <input type="password" name="password" onChange={this.handleInputChange}/>
          <button type="button" color="primary" onClick={this.submitLoginCredentials}>primary</button>
        </form>
      </div>
    );
  }
}

export default Login;
