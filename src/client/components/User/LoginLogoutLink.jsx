import React from 'react'
import { observer, inject } from 'mobx-react'
import { NavLink } from 'react-router-dom'

export const LoginLogoutLink = ({ user }) =>
  user.isLoggedIn && user.profile
  ? <a className="link login-logout" onClick={user.logout}>
      Logout
      <span className="hide-mobile">&nbsp;({ user.profile.email.replace(/@.*/gi, '') })</span>
    </a>
  : <NavLink className="login-logout" to="/login">Login</NavLink>

export default inject('user')(observer(LoginLogoutLink))
