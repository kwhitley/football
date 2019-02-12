import React, { useState, useRef, useEffect } from 'react'
import { navigate } from '@reach/router'
import Page from '../Page'
import LoginForm from './LoginForm'
import Input from '../Controls/Input'
import { validators } from '../../utils'
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

export default function Login({ location, signup = false }){
  console.log('Login')
  let origin = location.state && location.state.origin || undefined
  let { login, setLogin, error, loginAction, logoutAction, isValid } = useLogin(origin)
  let [ user ] = useStore('user')

  console.log({
    origin,
    user,
    login,
  })

  useEffect(
    () => {
      console.log('Login:useEffect', user)
      if (user.isLoggedIn) {
        console.log('user already logged in, redirecting to', origin, location)
        navigate(origin || '/')
      }
    }, [login, user]
  )

  console.log('isValid', isValid)

  return (
    <Page className="form">
      <h1>{ signup ? 'Sign Up' : 'Login' }</h1>

      <Input
        name="email"
        type="email"
        value={login.email}
        validator={validators.email()}
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

      <button
        onClick={loginAction}
        disabled={!isValid}
        >
        { signup ? 'Create Account' : 'Log In' }
      </button>
    </Page>
  )
}
