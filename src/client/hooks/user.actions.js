import { validators, fetchJSON, fetchStatusIsOK } from 'utils'
import { navigate } from '@reach/router'

export const loginAction = ({ email, password, resetLogin, setUser, setError, origin }) => {
  let {
    isValid,
    message: passwordMessage,
  } = validators.password

  if (!email || !password) {
    return setError('You need a username and password to login.')
  }

  if (!isValid(password)) {
    return setError(passwordMessage)
  }

  fetchJSON('/user/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(profile => {
      console.log('login success', profile, origin)

      setUser({
        isLoggedIn: true,
        profile,
      })

      setError()
      resetLogin && resetLogin()

      if (origin) {
        console.log('returning to', origin)
        navigate(origin)
      } else {
        navigate('/collections')
      }
    })
    .catch(() => {
      setUser({ profile: undefined, isLoggedIn: false })
      setError('Are you sure about that username and password?  Try again!')
    })
}

export const logoutAction = ({ onSuccess }) => {
  fetchStatusIsOK('/user/logout')
    .then(success => success ? onSuccess() : console.warn('unable to logout'))
}
