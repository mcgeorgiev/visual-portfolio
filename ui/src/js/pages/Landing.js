import React, { Component } from 'react';

class Landing extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className='landing-block'>
        {this.props.component}
      </div>
    );
  }
}

export default Landing;
