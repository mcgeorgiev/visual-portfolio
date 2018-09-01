import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing'
import Dashboard from './Dashboard'
 import LoginContainer from "../container";
import {AuthContainer, requireAuthentication} from "./Auth";

const App = () => (
  <div>
    <meta name="viewport" content="width=device-width,height=device-height,initial-scale=1.0"/>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,300italic" rel="stylesheet" type="text/css"/>

    <main className='mainWrapper'>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/login' component={LoginContainer}/>
        <Route path='/dashboard' render={() => {
            return <AuthContainer component={<Dashboard/>}/>
          }}
        />
        <Route component={Landing} />
      </Switch>
    </main>
  </div>
);

export default App

