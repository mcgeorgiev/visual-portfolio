import React from "react";
import {Link} from 'react-router-dom'

export class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="header">
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-md-10 col-lg-10">
            <div className="box-row"><span className="header-title">Portfolio</span></div>
          </div>
          <div className='hidden-xs col-sm-2 col-md-1 col-lg-1'>
            <div className="box-row header-button"><Link to="/"><b>SIGNUP</b></Link></div>
          </div>
          <div className="hidden-xs col-sm-2 col-md-1 col-lg-1">
            <div className="box-row header-button"><Link to="/"><b>LOGIN</b></Link></div>
          </div>
        </div>
      </div>
    )
  }
}
