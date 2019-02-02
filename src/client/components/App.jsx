import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  Router,
} from 'react-router-dom'

import CollectionIndex from './Collection'
import ItemViewer from './Collection/Item/Viewer'
import Login from './User/Login'
import CreateCollection from './Collection/CreateForm'
import Back from './Back'
import UserActions from './User/UserActions'

const App = ({ history }) =>
  <Router history={history}>
    <Route render={(props) =>
      <div className="page-content">
        <Switch>
          <Route
            path="/login"
            exact
            render={() => <Login {...props} />}
            />
          <Route
            path="/collections/create"
            exact
            render={() => <CreateCollection {...props} />}
            />
          <Route
            path="/signup"
            exact
            render={() => <Login {...props} signup />}
            />
          <Route
            path="/:collection?"
            exact
            component={CollectionIndex}
            />
          <Route
            path="/:collection/:id"
            exact
            component={ItemViewer}
            />
          <Route render={() => <div>Page not found</div>} />
        </Switch>
        <UserActions {...props} />
      </div>
    }>
    </Route>
  </Router>

export default App
