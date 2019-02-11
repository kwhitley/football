import React from 'react'
import { observer, inject } from 'mobx-react'
import { Link } from '@reach/router'

export const LoginLogoutLink = ({ user }) =>
  user.isLoggedIn && user.profile
  ? <a className="link login-logout" onClick={user.logout}>
      Logout
      <span className="hide-mobile">&nbsp;({ user.profile.email.replace(/@.*/gi, '') })</span>
    </a>
  : <Link className="login-logout" to="/login">Login</Link>

export default inject('user')(observer(LoginLogoutLink))
