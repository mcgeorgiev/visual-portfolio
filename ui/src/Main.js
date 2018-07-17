import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing'
import Dashboard from './Dashboard'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Landing}/>
      <Route path='/Dashboard' component={Dashboard}/>
    </Switch>
  </main>
)

export default Main
