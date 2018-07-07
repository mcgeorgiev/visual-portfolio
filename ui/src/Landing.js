import React, { Component } from 'react';
import axios from 'axios';
import Login from './Login';

class Landing extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        Landing
        <Login />
      </div>
    );
  }
}

export default Landing;
