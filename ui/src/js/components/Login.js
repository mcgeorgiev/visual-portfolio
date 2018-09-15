import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Login extends Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     eyeIcon: "zdfksdfsdfj"
  //   }
  // }

  handleChange = (input) => (event) => {
    input.eventHandler(event.target.value)
  };

  render() {
    return (
      <div className='form landing-form'>
        <h2>Login</h2>
        <div className="alert">
          {this.props.error}
        </div>
        <form className='form'>
          <input type="text" name="email" onChange={this.handleChange({eventHandler: this.props.loginEmailChanged})} placeholder='Email'/>
          <input type="password" name="password" onChange={this.handleChange({eventHandler: this.props.loginPasswordChanged})} placeholder='Password'/>
          <button className='signup-button' type="button" color="primary" onClick={this.props.onLoginDetailsSubmitted}>LOGIN</button>
          {/* <p className="center">First time here? <Link to="/"><b>Sign up</b></Link></p> */}

        </form>
      </div>
    );
  }
}

export default Login;
