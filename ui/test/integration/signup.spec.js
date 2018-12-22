import React from 'react'
import { Provider } from 'react-redux'
import SignupContainer from '../../src/js/containers/signup'
import { sagaMiddleware, store } from '../../src/js/store'
import rootSaga from '../../src/js/sagas/index.js'
import { render, fireEvent } from 'react-testing-library'
import { BrowserRouter } from 'react-router-dom'

sagaMiddleware.run(rootSaga)

describe('Given a store ', () => {
  xit('when valid credentials are submitted should be directed to the login page', async () => {
    // write integration tests for both login and store -> mock out response
    // do refactor into ducks

    const { getByPlaceholderText, getByText } = render(<Provider store={store} ><BrowserRouter><SignupContainer /></BrowserRouter></Provider>)

    const fullName = getByPlaceholderText('Full Name')
    fireEvent.change(fullName, { target: { value: 'Joe Bloggs' } })

    const email = getByPlaceholderText('Email')
    fireEvent.change(email, { target: { value: 'joe@bloggs.com' } })

    const password = getByPlaceholderText('Password')
    fireEvent.change(password, { target: { value: 'Joe' } })

    fireEvent.click(getByText('SIGN ME UP'))
  })
})
