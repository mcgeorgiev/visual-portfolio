import React from 'react'

const Landing = Component => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12'>
          <div className='box box-container'>
            <div className='row center-lg center-md center-sm center-xs'>
              <div className='col-lg-5 col-md-6 col-sm-6 col-xs-12'>
                <div className='box-nested'>
                  <Component {...this.props} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const withLanding = (WrappedComponent) => {
  class Wrapper extends React.PureComponent {
    render () {
      return (

        <div className='container'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box box-container'>
                <div className='row center-lg center-md center-sm center-xs'>
                  <div className='col-lg-5 col-md-6 col-sm-6 col-xs-12'>
                    <div className='box-nested'>
                      <div><WrappedComponent {...this.props} /></div>
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
  return Wrapper
}

export default withLanding
