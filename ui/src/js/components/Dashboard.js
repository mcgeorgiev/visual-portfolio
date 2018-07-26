import React, {Component} from 'react'
import {withRouter} from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div className='landing-block' id='dash-board'>
        Hello!
      </div>
    );
  }
}

export default withRouter(Dashboard);


