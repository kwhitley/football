import { useState, useEffect } from 'react'
import { globalStore, useStore } from './store'
import { loginAction, logoutAction } from './user.actions'
import { fetchJSON } from '../utils'
import { navigate } from '@reach/router'

globalStore.set('user', {
  isLoggedIn: false,
})

fetchJSON('/user/profile')
  .then(profile => {
    console.log('logging in with profile')
    globalStore.set('user', { isLoggedIn: true, profile })
  })
  .catch(() => {
    console.warn('user is not logged in')
  })

export function useLogin() {
  let [ login, setLogin ] = useState({
    email: '',
    password: '',
    isValidating: false,
  })
  let [ error, setError ] = useState(undefined)
  let [ user, setUser ] = useStore('user')
  let resetLogin = () => setLogin({ email: '', password: '', isValidating: false })

  useEffect(() => setError(undefined), [login])

  return {
    login,
    error,
    setLogin: ({ name, value }) => setLogin({ ...login, [name]: value }),
    loginAction: () => loginAction({ login, resetLogin, setUser, setError }),
    logoutAction: () => {
      console.log('logging out')
      logoutAction({
        onSuccess: () => setUser({ isLoggedIn: false, profile: undefined })
      })
    }
  }
}
