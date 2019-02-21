import React, { useState, useRef, useEffect } from 'react'
import { Router } from '@reach/router'
import MissingPage from 'Common/MissingPage'
import Create from './Create'
import List from './List'

export default function CollectionsIndex() {
  return (
    <Router>
      <List path="/" />
      <Create path="create" />
      <MissingPage default />
    </Router>
  )
}
