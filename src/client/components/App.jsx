import React from 'react'
import { Switch, Route, Redirect, Router } from 'react-router-dom'

import ImageCollection from './ImageCollection'
import Viewer from './Viewer'

const App = ({ history }) =>
  <Router history={history}>
    <Switch>
      <Route path="/view/:id" component={Viewer} />
      <Route path="/" component={ImageCollection} />
    </Switch>
  </Router>

export default App
