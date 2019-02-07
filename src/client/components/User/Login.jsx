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

export default ({ navigate, signup = false }) => {
  let { login, setLogin, error, loginAction, logoutAction } = useLogin()
  let { collections, isLoading } = useCollections()
  let collection = useNewCollection()
  let {
    slug,
    setSlug,
    apiKey,
    setApiKey,
    isAvailable,
  } = collection
  let [ counter, setCounter ] = useStore('counter', 0)
  let [ counter2, setCounter2 ] = useStore('counter2', 30)
  let [ foo, setFoo ] = useStore('foo' )
  let [ user ] = useStore('user')

  let previousIsAvailable = usePrevious(isAvailable)

  return (
    <Page className="form full-page user-login" navigate={navigate}>
      <h1>Counter ({ counter }, { counter2 })</h1>
      <button onClick={() => { setCounter(counter + 1); setFoo('foo ' + (counter + 1))}}>Increment Counter1</button>
      <button onClick={() => setCounter2(counter2 + 1)}>Increment Counter2</button>

      <h1>Foo = { foo }</h1>

      {
        isLoading ? <div>Loading...</div> :
        collections.map((c, i) =>
          <CollectionDetails key={c.slug} collectionId={c.slug} />
        )
      }
      <Inspect item={collections.map(c => c.slug)} />

      <h1>User</h1>
      <Inspect item={login} />
      <Inspect item={user} />

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
              validator={validators.password}
              />

            { error && <div className="error">{error}</div> }

            <button onClick={loginAction}>Submit</button>
          </React.Fragment>
        : <button onClick={logoutAction}>Logout</button>
      }

      <h1>New Collection</h1>
      <Inspect item={collection} somethingelse />

      <Input
        placeholder="Collection Link (URL)"
        value={slug}
        onChange={setSlug}
        />

      <Input
        placeholder="Your API Key"
        value={apiKey}
        onChange={setApiKey}
        />


      <h1>isAvailable</h1>
      { isAvailable ? 'available' : 'name taken' }

      <h1>isAvailable (previous)</h1>
      { previousIsAvailable ? 'prev:available' : 'prev:name taken' }
    </Page>
  )
}

// export default inject('user')(observer(LoginForm))
