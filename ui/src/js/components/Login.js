import React, { Component } from 'react';

class Login extends Component {

  handleChange = (input) => (event) => {
    input.eventHandler(event.target.value)
  };

  render() {
    return (
      <div>
        <h2>Login</h2>
        <div className="alert">
          {this.props.error}
        </div>
        <form className='login'>
          <input type="text" name="email" onChange={this.handleChange({eventHandler: this.props.loginEmailChanged})}/>
          <input type="password" name="password" onChange={this.handleChange({eventHandler: this.props.loginPasswordChanged})}/>
          <button type="button" color="primary" onClick={this.props.onLoginDetailsSubmitted}>LOGIN</button>
        </form>
      </div>
    );
  }
}

export default Login;
