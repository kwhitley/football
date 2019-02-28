import React from 'react'
import { Link, navigate } from '@reach/router'
import { useStore, useLogin } from 'hooks'
import PoweredBy from './PoweredBy'

export default function Footer({ location }) {
  let origin = location && location.state && location.state.origin || undefined
  let { user, actions } = useLogin()

  return (
    <footer>
      {
        user.isLoggedIn
        ? <React.Fragment>
            <a className="link" onClick={actions.logout}>Logout</a>
            <Link className="collections" to="/collections">Collections</Link>
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
                    replace: true,
                  }
                )
              }>Log In</a>
            <Link to="/signup">Sign Up</Link>
          </div>
      }
      <PoweredBy />
    </footer>
  )
}
