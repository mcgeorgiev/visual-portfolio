import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing'
import Dashboard from './Dashboard'
import LoginContainer from '../container'
import { AuthContainer } from './Auth'
import Signup from './Signup'

const App = () => (
  <div>
    <link href='https://fonts.googleapis.com/css?family=Lato:100,300,400,300italic' rel='stylesheet' type='text/css' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />

    <main className='mainWrapper'>
      <Switch>
        <Route path='/login' render={() => {
          return <Landing component={<LoginContainer />} />
        }}
        />
        <Route path='/' render={() => {
          return <Landing component={<Signup />} />
        }}
        />
        <Route path='/dashboard' render={() => {
          return <AuthContainer component={<Dashboard />} />
        }}
        />
      </Switch>
    </main>
  </div>
)

export default App
