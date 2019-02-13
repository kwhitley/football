import React, { useState, useRef, useEffect } from 'react'
import { Router } from '@reach/router'
import { useLogin, useStore, requireLogin } from 'hooks'
import Page from 'common/Page'
import Create from './Create'
import List from './List'

export default function CollectionsIndex() {
  return (
    <Router>
      <List path="/" />
      <Create path="create" />
      <div default>404</div>
    </Router>
  )
}
