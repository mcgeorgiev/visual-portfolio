import React, { Component } from 'react';
import Login from './Login';
import Signup from './Signup';

class Landing extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className='landing-block'>
        {/*<Login />*/}
        <Signup />
      </div>
    );
  }
}

export default Landing;