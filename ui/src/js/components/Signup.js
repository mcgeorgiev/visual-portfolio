import React, {
  Component
} from 'react';
import {
  Link,
  withRouter
} from "react-router-dom";

const axios = require('axios');

const eye = require('../../css/styles/images/eye.svg');
const eyeOff = require('../../css/styles/images/eye-off.svg');


class Signup extends Component {
  constructor() {
    super();
    this.state = {
      fullname: '',
      email: '',
      password: '',
      showPassword: 'password',
      eyeIcon: eye,
      validationErrors: {}
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

  validate = () => {
    let empty = ((this.state.fullname === '') ||
      (this.state.email === '') ||
      (this.state.password === ''));
    let passwordValid = this.state.password.length > 6;
    let fullnameValid = this.state.fullname.length > 0;
    let emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    let alerts = [];

    if (!fullnameValid) {
      alerts.push("Please enter your full name.");
    } else if (!emailValid) {
      alerts.push("Please enter a valid email.");
    } else if (!passwordValid) {
      alerts.push("Password must have six or more characters.");
    } else if (empty) {
      alerts.push('Please enter all fields.');
    }
    return alerts;
  };

  submitCredentials = () => {

    const alerts = this.validate();
    console.log(alerts);
    if (Array.isArray(alerts) && alerts.length) {
      this.setState({
        alert: alerts[0]
      });
    } else {
      this.createAccount();
    }
  };

  createAccount = () => {
    axios.post('http://127.0.0.1:8000/api/create', {
      user: {
        email: this.state.email,
        password: this.state.password
      },
      full_name: this.state.fullname,
    })
      .then(() => {
        // Auth.obtain(this.state.email, this.state.password, () => {
        //   this.props.history.push("/dashboard");
        // })
      })
      .catch((error) => {
        let alert = '';
        if (error.response) {
          if (error.response.status === 409) {
            alert = 'This email address is already in use.';
          } else if (error.response.status === 400) {
            alert = 'Invalid data sent.';
          }
          this.setState({
            alert: alert
          });
        }
      });
  };

  render() {
    return (
      <div className='form landing-form'>
        <
          h2> Sign Up < /h2>
          <
            div className="alert"> {
            this.state.alert
          }
            <
            /div>
            <
              form className='form'>
              <
                input type="text"
                      name="fullname"
                      onChange={
                        this.handleInputChange
                      }
                      placeholder='Full Name' />
              <input type="text"
                      name="email"
                      onChange={
                        this.handleInputChange
                      }
                      placeholder='Email' />
              <
                img src={
                this.state.eyeIcon
              }
                    onClick={
                      this.toggleShowPassword
                    }
                    className='show-password-icon' / >
              <
                input type={
                this.state.showPassword
              }
                      name="password"
                      onChange={
                        this.handleInputChange
                      }
                      placeholder='Password' / >
              <
                button type="button"
                       onClick={
                         this.submitCredentials
                       }
                       className='signup-button'> SIGN ME
                UP < /button> {/*<div className='terms-conditions'>*/} {/*By signing up, you agree to our <b>Terms</b>. Learn how we collect, use and share your data in out <b>Data Policy</b> and how we use cookies and similar technology in out <b>Cookies Policy</b>.*/} {/*</div>*/}
                <
                  p className="center"> Not the first time here ? < Link to="/login"> < b> Log in < /b></Link>
                  <
                  /p>

                  <
                  /form>

                  <
                  /div>
                  );
                  }
                  }

                  export default withRouter(Signup);