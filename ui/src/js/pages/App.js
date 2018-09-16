import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing'
import Dashboard from './Dashboard'
import LoginContainer from '../containers/login'
import { AuthContainer } from '../components/Auth'
import SignupContainer from "../containers/signup";

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
        <Route path='/dashboard' render={() => {
          return <AuthContainer component={<Dashboard />} />
        }}
        />
        <Route path='/' render={() => {
          return <Landing component={<SignupContainer />} />
        }}
        />uuserbnbnbn
      </Switch>
    </main>
  </div>
)

export default App
