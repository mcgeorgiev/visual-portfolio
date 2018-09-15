import { connect } from 'react-redux'
import React, { Component } from 'react'
import { viewRoute } from '../actions/session'

class AuthenticatedComponent extends Component {
  componentWillMount () {
    this.props.viewRoute()
  }

  componentWillReceiveProps () {
    this.props.viewRoute()
  }

  render () {
    return (
      <div>
        {this.props.component}
      </div>
    )
  }
}

export default AuthenticatedComponent

export const mapDispatchToProps = dispatch => ({
  viewRoute: () => dispatch(viewRoute())
})

export const mapStateToProps = state => ({
  token: state.session.token
})

export const AuthContainer = connect(
  mapStateToProps,
  mapDispatchToProps)(AuthenticatedComponent)
