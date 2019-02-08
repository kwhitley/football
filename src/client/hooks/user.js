import { useState, useEffect } from 'react'
import { globalStore, useStore } from './store'
import { loginAction, logoutAction } from './user.actions'
import { fetchJSON } from '../utils'
import { navigate } from '@reach/router'

globalStore.persist('user', { isLoggedIn: true })

fetchJSON('/user/profile')
  .then(profile => {
    console.log('profile fetched')
    globalStore.set('user', { isLoggedIn: true, profile })
  })
  .catch(() => {
    console.warn('user profile could not be found')
    globalStore.set('user', { isLoggedIn: false, profile: undefined })
  })

export function useLogin(origin) {
  let [ login, setLogin ] = useState({
    email: '',
    password: '',
    isValidating: false,
  })
  let [ error, setError ] = useState(undefined)
  let [ user, setUser ] = useStore('user')
  let resetLogin = () => {
    setError()
    setLogin({ email: '', password: '', isValidating: false })
  }

  // useEffect(() => setError(undefined), [login])

  return {
    login,
    error,
    setLogin: ({ name, value }) => setLogin({ ...login, [name]: value }),
    loginAction: () => {
      loginAction({ login, resetLogin, setUser, setError, origin })
    },
    logoutAction: () => {
      console.log('logging out')
      logoutAction({
        onSuccess: () => setUser({ isLoggedIn: false, profile: undefined })
      })
    }
  }
}

export function requireLogin(location) {
  let [ user ] = useStore('user')

  useEffect(
    () => {
      if (!user.isLoggedIn) {
        console.log('user not logged in', user, 'redirecting to login')
        navigate('/login', { state: { origin: location.pathname }, replace: true })
      }
    }
  )

  return user.isLoggedIn
}
