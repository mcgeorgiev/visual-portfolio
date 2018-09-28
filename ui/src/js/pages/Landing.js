import React, {Component} from 'react';

class Landing extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <div className='row'>
          <div className="col-xs-12">
            <div className="box box-container">
              <div className="row center-lg center-md center-sm center-xs">
                <div className="col-lg-5 col-md-6 col-sm-6 col-xs-12">
                  <div className="box-nested">
                    {this.props.component}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing;
