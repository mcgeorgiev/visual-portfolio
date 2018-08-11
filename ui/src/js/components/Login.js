import React, { Component } from 'react';
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

  handleChange = (event) => {
    console.log(event.target.value);
    this.props.loginEmailChanged(event.target.value);
  }

  submitLoginCredentials() {
    this.setState({
      alert: (((this.state.email === '') || (this.state.password === '')) ? 'Please enter a password and email address.' : '')
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.geod.title || 'Hello World!'}</h1>

        {this.props.geod.title ?
          <button onClick={this.props.closeGeod}>
            Exit Geod
          </button> :
          <button onClick={() => this.props.activateGeod({ title: 'I am a geo dude!' })}>
            Click Me!
          </button>
        }

        <Link to='/dashboard'>Dash</Link>
        <h2>Login</h2>
        <div className="alert">
          {this.state.alert}
        </div>
        <form className='login'>
          <input type="text" name="email" onChange={this.handleChange}/>
          <input type="password" name="password" onChange={this.handleInputChange}/>
          <button type="button" color="primary" onClick={this.submitLoginCredentials}>primary</button>
        </form>
      </div>
    );
  }
}

export default Login;
