import React from 'react'
import { Switch, Route } from 'react-router-dom'
import {Footer} from '../components/Footer'
import {Header} from '../components/Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import LoginContainer from '../containers/login'
import { AuthContainer } from '../components/Auth'
import SignupContainer from "../containers/signup";

const App = () => (
  <div>
    <link href='https://fonts.googleapis.com/css?family=Lato:100,300,400,300italic' rel='stylesheet' type='text/css' />
    <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" />
    <meta name='viewport' content='width=device-width, initial-scale=1' />

    <main className='mainWrapper'>
      <Header />
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
        />
      </Switch>
      <Footer />
    </main>
  </div>
)

export default App
