import React from 'react'
import { Link, navigate } from '@reach/router'
import { useStore, useLogin } from 'hooks'

export default function UserActions({ location }) {
  let origin = location && location.state && location.state.origin || undefined
  let { user, logoutAction } = useLogin()

  return (
    <React.Fragment>
      {
        user.isLoggedIn
        ? <React.Fragment>
            <a className="link" onClick={logoutAction}>Logout</a>
            <Link to="/collections">Collections</Link>
          </React.Fragment>
        : <div className="login-signup">
            <a
              className="link"
              onClick={() =>
                navigate('/login',
                  {
                    state: {
                      origin: location && location.pathname
                    },
                    replace: true
                  }
                )
              }>Login</a>
            <Link to="/signup">Signup</Link>
          </div>
      }
    </React.Fragment>
  )
}
