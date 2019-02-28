import React, { useState, useRef, useEffect, memo, useMemo } from 'react'
import { navigate } from '@reach/router'
import Page from 'Common/Page'
import Input from 'Common/Input'
import Inspect from 'Common/Inspect'
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


const useForm = (original) => {
  const [ values, setValues ] = useState(original)
  const [ isDirty, setIsDirty ] = useState(false)

  const setValue = (name) => (value) => {
    setValues({ ...values, [name]: value })
    setIsDirty(true)
  }

  return {
    original,
    values,
    setValues,
    setValue,
    isDirty,
  }
}

export default function Login({ location, signup = false }) {
  useDocumentTitle('Log In')
  let origin = location.state && location.state.origin || undefined
  origin = origin === '/login' ? '/collections' : origin
  let {
    email,
    setEmail,
    password,
    setPassword,
    login,
    error,
    actions,
    logoutAction,
    isValid,
  } = useLogin(origin)
  let [ user ] = useStore('user')

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

      <Inspect item={{ email, password }} />

      <Input
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
        validator={validators.email}
        />

      <Input
        name="password"
        type="password"
        value={password}
        onChange={setPassword}
        validator={validators.password}
        />

        { error && <div className="error">{error}</div> }

      <button
        onClick={actions.login}
        disabled={!isValid}
        >
        { signup ? 'Create Account' : 'Log In' }
      </button>
    </Page>
  )
}
