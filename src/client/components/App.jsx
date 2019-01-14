import React from 'react'
import {
  Switch,
  Route,
  Redirect,
  Router,
} from 'react-router-dom'
import {
  TransitionGroup,
  CSSTransition,
} from 'react-transition-group'

import ImageCollection from './ImageCollection'
import Viewer from './Viewer'
import Back from './Back'

const App = ({ history }) =>
  <Router history={history}>
    <Route render={({ location, history }) =>
      <div className="page-content">
        <Back
          history={history}
          location={location}
          />
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            timeout={200}
            classNames="fade"
          >
            <Switch>
              <Route path="/view/:id" component={Viewer} />
              <Route path="/" component={ImageCollection} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    }>
    </Route>
  </Router>

export default App
