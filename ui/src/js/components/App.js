import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Landing from './Landing'
import Dashboard from './Dashboard'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    true === false
      ? <Component {...props} />
      : <Redirect to='/' />
  )} />
);

const App = () => (
  <div>
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0"/>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,300italic" rel="stylesheet" type="text/css"/>

    <main className='mainWrapper'>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <Route component={Landing} />
      </Switch>
    </main>
  </div>
);

export default App

