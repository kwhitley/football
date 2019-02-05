import React from 'react'
import { Router } from '@reach/router'

import CollectionIndex from './Collection'
import ItemViewer from './Collection/Item/Viewer'
import Login from './User/Login'
import CreateCollection from './Collection/CreateForm'
import Back from './Back'
import UserActions from './User/UserActions'

const App = ({ history }) =>
  <div className="page-content">
    <Router>
      <CreateCollection path="create-collection" />
      <Login path="signup" signup />
      <Login path="login" />
      <ItemViewer path=":collectionId/:itemId" />
      <CollectionIndex path=":collectionId" />
      <CollectionIndex path="/" />
      <div default>Page not found</div>
    </Router>

    <UserActions />
  </div>

export default App
