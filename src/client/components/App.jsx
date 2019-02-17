import React from 'react'
import { Router } from '@reach/router'
import { useKeyboardSpacing } from 'hooks'
import MissingPage from 'Common/MissingPage'
import Sandbox from 'Common/Sandbox'
import CollectionViewer from './Collection'
import ItemViewer from './Collection/Item/Viewer'
import Login from './User/Login'
import CollectionsList from './Collections/List'
import CreateCollection from './Collections/Create'
import Footer from './Layout/Footer'

export default function App() {
  let { spacer } = useKeyboardSpacing()

  return (
    <div className="page-content" style={{ marginBottom: spacer }}>
      <Router className="main">
        <Login path="signup" signup />
        <Login path="login" />
        <CollectionsList path="collections" />
        <Sandbox path="sandbox" />
        <CreateCollection path="collections/create" />
        <CollectionViewer path=":collectionId" />
        <ItemViewer path=":collectionId/:itemId" />
        <CollectionViewer path="/" />
        <MissingPage default />
      </Router>

      <Router className="controls" primary={false}>
        <Footer default />
      </Router>
    </div>
  )
}
