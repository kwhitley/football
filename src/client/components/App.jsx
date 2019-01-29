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
import UserActions from './User/UserActions'

const App = ({ history }) =>
  <Router history={history}>
    <Route render={(props) =>
      <div className="page-content">
        <Back {...props} />
        <Switch>
          <Route
            path="/login"
            render={() => <Login {...props} />}
            />
          <Route
            path="/signup"
            render={() => <Login {...props} signup />}
            />
          <Route
            path="/view/:id"
            render={() => <Viewer {...props} />}
            />
          <Route
            path="/"
            render={() => <ImageCollection {...props} />}
            />
        </Switch>
        <UserActions {...props} />
      </div>
    }>
    </Route>
  </Router>

export default App
