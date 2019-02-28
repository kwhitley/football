import { useState, useEffect } from 'react'
import { globalStore, useStore } from './store'
import { loginAction, logoutAction } from './user.actions'
import { validators, fetchJSON } from 'utils'
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
  let [ email, setEmail ] = useState('')
  let [ password, setPassword ] = useState('')
  let [ error, setError ] = useState(undefined)
  let [ user, setUser ] = useStore('user')

  let resetLogin = () => {
    setError()
    setLogin({ email: '', password: '', isValidating: false })
  }

  let isValid = validators.password().isValid(password) &&
    validators.email().isValid(email)

  return {
    email,
    setEmail,
    password,
    setPassword,
    user,
    error,
    loginAction: () => {
      loginAction({ login, resetLogin, setUser, setError, origin })
    },
    isValid,
    logoutAction: () => {
      console.log('logging out')
      logoutAction({
        onSuccess: () => setUser({ isLoggedIn: false, profile: undefined })
      })
    }
  }
}

export function useOwnsCollection(collectionId) {
  let [ user ] = useStore('user')

  if (user.isLoggedIn) {
    let ownedCollections = user.profile.collections
    // console.log('ownedCollections', ownedCollections)
    // console.log('checking against', collectionId)
    return !!ownedCollections.find(c => c.slug === collectionId))
  }

  return false
}

export function useLoginRequired(location) {
  let [ user ] = useStore('user')

  if (!user.isLoggedIn) {
    console.log('user not logged in', user, 'redirecting to login')
    navigate('/login', { state: { origin: location.pathname }, replace: true })
  }

  return user.isLoggedIn
}
