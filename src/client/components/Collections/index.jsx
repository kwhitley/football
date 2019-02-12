import React, { useState, useRef, useEffect } from 'react'
import { Router } from '@reach/router'
import Create from './Create'
import List from './List'
import Page from '../Page'
import { useLogin, useStore, requireLogin } from '../../hooks'

export default function CollectionsIndex() {
  // let isLoggedIn = requireLogin(location)

  // let origin = location.state && location.state.origin || undefined
  // let { login, setLogin, setOrigin, error, loginAction, logoutAction } = useLogin(origin)
  // let { collections, isLoading } = useCollections()
  // let [ counter, setCounter ] = useStore('counter', 0)
  // let [ counter2, setCounter2 ] = useStore('counter2', 30)
  // let [ user ] = useStore('user')

  console.log('rendering CollectionsIndex')

  return (
    <Router>
      <List path="/" />
      <Create path="create" />
      <div default>404</div>
    </Router>
  )
}
