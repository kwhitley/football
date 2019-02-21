import React, { useState, useRef, useEffect } from 'react'
import { navigate } from '@reach/router'
import Page from 'Common/Page'
import Input from 'Common/Input'
import { validators } from 'utils'
import {
  usePrevious,
  useCollections,
  useCollectionSlugIsAvailable,
  useCollectionDetails,
  useNewCollection,
  useLogin,
  useStore,
  globalStore,
  useDocumentTitle,
} from 'hooks'

export default function Login({ location, signup = false }) {
  useDocumentTitle('Log In')
  let origin = location.state && location.state.origin || undefined
  let {
    email,
    setEmail,
    password,
    setPassword,
    login,
    setLogin,
    error,
    loginAction,
    logoutAction,
    isValid,
  } = useLogin(origin)
  let [ user ] = useStore('user')
  let [ foo, setFoo ] = useStore('foo', '')

  useEffect(
    () => {
      if (user.isLoggedIn) {
        console.log('user already logged in, redirecting to', origin, location)
        navigate(origin || '/')
      }
    }, [login, user]
  )

  return (
    <Page className="form">
      <h1>{ signup ? 'Sign Up' : 'Log In' }</h1>

      <Input
        type="email"
        value={email}
        // validator={validators.email()}
        onChange={setEmail}
        />

      <Input
        type="password"
        value={password}
        onChange={setPassword}
        // validator={validators.password()}
        />

      <Input
        value={foo}
        onChange={setFoo}
        // validator={validators.password()}
        />

        { error && <div className="error">{error}</div> }

      <button
        onClick={loginAction}
        disabled={!isValid}
        >
        { signup ? 'Create Account' : 'Log In' }
      </button>
    </Page>
  )
}
