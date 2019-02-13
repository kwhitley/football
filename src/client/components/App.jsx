import React from 'react'
import { Router } from '@reach/router'

import CollectionViewer from './Collection'
import ItemViewer from './Collection/Item/Viewer'
import Login from './User/Login'
import CollectionsList from './Collections/List'
import CreateCollection from './Collections/Create'
import UserActions from './User/UserActions'
import MissingPage from 'common/MissingPage'

const App = () =>
  <div className="page-content">
    <Router className="main">
      <Login path="signup" signup />
      <Login path="login" />
      <CollectionsList path="collections" />
      <CreateCollection path="collections/create" />
      <CollectionViewer path=":collectionId" />
      <ItemViewer path=":collectionId/:itemId" />
      <CollectionViewer path="/" />
      <MissingPage default />
    </Router>

    <Router className="controls" primary={false}>
      <UserActions default />
    </Router>
  </div>

export default App
