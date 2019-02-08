import React, { useState, useRef, useEffect } from 'react'
import Page from '../Page'
import LoginForm from './LoginForm'
import Inspect from '../Controls/Inspect'
import Input from '../Controls/Input'
import { login } from '../../api/users'
import {
  fetchJSON,
  fetchStatus,
  fetchStatusIsOK,
  withValue,
  validators,
} from '../../utils'
import {
  usePrevious,
  useCollections,
  useCollectionSlugIsAvailable,
  useCollectionDetails,
  useNewCollection,
  useLogin,
  useStore,
  globalStore,
} from '../../hooks'

globalStore.set('foo', 'bar')

export const CollectionDetails = ({ collectionId }) => {
  let { collection, isLoading } = useCollectionDetails(collectionId)
  let [ counter, setCounter ] = useStore('counter')
  let [ counter2] = useStore('counter2')
  let [ user ] = useStore('user')

  if (!collection) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{ collection.name } ({ collection.items.length }), user.isLoggedIn? { user.isLoggedIn ? 'yes' : 'no'}</h1>
      Counter: { counter }
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <div>Counter2: { counter2 }</div>
    </div>
  )
}

export default ({ location, signup = false }) => {
  let origin = location.state && location.state.origin || undefined
  let { login, setLogin, setOrigin, error, loginAction, logoutAction } = useLogin(origin)
  let { collections, isLoading } = useCollections()
  let [ counter, setCounter ] = useStore('counter', 0)
  let [ counter2, setCounter2 ] = useStore('counter2', 30)
  let [ user ] = useStore('user')

  if (origin) {
    console.log('location', origin)
  }

  return (
    <Page className="form">
      <h1>Login</h1>
      {
        !user.isLoggedIn
        ? <React.Fragment>
            <Input
              name="email"
              type="email"
              value={login.email}
              onChange={setLogin}
              />

            <Input
              name="password"
              type="password"
              value={login.password}
              onChange={setLogin}
              validator={validators.password()}
              />

            { error && <div className="error">{error}</div> }

            <button onClick={loginAction}>Submit</button>
          </React.Fragment>
        : <button onClick={logoutAction}>Logout</button>
      }

      <Inspect item={login} />
      <Inspect item={user} />
    </Page>
  )
}
