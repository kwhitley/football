import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  Router,
} from 'react-router-dom'

import ImageCollection from './ImageCollection'
import Viewer from './Viewer'
import Login from './User/Login'
import Back from './Back'
import UserActionLink from './User/UserActionLink'

const App = ({ history }) =>
  <Router history={history}>
    <Route render={({ location, history }) =>
      <div className="page-content">
        <Back history={history} location={location} />
        <Switch>
          <Route
            path="/login"
            render={({ location, history }) => <Login location={location} history={history} />}
            />
          <Route
            path="/view/:id"
            render={({ location, history, match }) => <Viewer location={location} history={history} match={match} />}
            />
          <Route
            path="/"
            render={({ location, history }) => <ImageCollection location={location} history={history} />}
            />
        </Switch>
        <UserActionLink history={history} location={location} />
      </div>
    }>
    </Route>
  </Router>

export default App
