import { validators, fetchJSON, fetchStatusIsOK } from '../utils'

export const loginAction = ({ login, resetLogin, setUser, setError }) => {
  let { password } = validators

  if (!login.email || !login.password) {
    return setError('You need a username and password to login.')
  }

  if (!validators.password.fn(login.password)) {
    return setError(validators.password.message)
  }

  fetchJSON('/user/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login),
    })
    .then(profile => {
      console.log('login success', profile)

      setUser({
        isLoggedIn: true,
        profile,
      })

      resetLogin && resetLogin()
    })
    .catch(() => setError('Are you sure about that username and password?  Try again!'))
}

export const logoutAction = ({ onSuccess }) => {
  fetchStatusIsOK('/user/logout')
    .then(success => success ? onSuccess() : console.warn('unable to logout'))
}
